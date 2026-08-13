// Credentials are encrypted with the Windows Data Protection API. DPAPI derives
// the key from the logged in user account, so there is no key for us to store
// and the ciphertext is useless if the file is copied to another machine or read
// by another user. It cannot defend against code already running as this user,
// which is the same trade-off browsers make for saved passwords.
use base64::engine::general_purpose::STANDARD;
use base64::Engine;
use windows::core::PCWSTR;
use windows::Win32::Foundation::HLOCAL;
use windows::Win32::Security::Cryptography::{
    CryptProtectData, CryptUnprotectData, CRYPT_INTEGER_BLOB,
};
use windows::Win32::System::Memory::LocalFree;

// Marks a value as ciphertext. Anything without it is treated as a plaintext
// leftover from 0.1.3 or earlier and re-encrypted on the next save.
const PREFIX: &str = "dpapi:";

// Never let DPAPI put a dialog on screen; fail instead.
const CRYPTPROTECT_UI_FORBIDDEN: u32 = 0x1;

fn blob(bytes: &[u8]) -> CRYPT_INTEGER_BLOB {
    CRYPT_INTEGER_BLOB {
        cbData: bytes.len() as u32,
        pbData: bytes.as_ptr() as *mut u8,
    }
}

// Copies the blob Windows allocated for us and hands the memory straight back.
unsafe fn take(out: CRYPT_INTEGER_BLOB) -> Vec<u8> {
    let bytes = std::slice::from_raw_parts(out.pbData, out.cbData as usize).to_vec();
    let _ = LocalFree(HLOCAL(out.pbData as isize));
    bytes
}

pub fn protect(plain: &str) -> Result<String, String> {
    if plain.is_empty() {
        return Ok(String::new());
    }

    let input = blob(plain.as_bytes());
    let mut out = CRYPT_INTEGER_BLOB::default();

    unsafe {
        CryptProtectData(
            &input,
            PCWSTR::null(),
            None,
            None,
            None,
            CRYPTPROTECT_UI_FORBIDDEN,
            &mut out,
        )
        .ok()
        .map_err(|e| format!("could not encrypt credential: {e}"))?;

        Ok(format!("{PREFIX}{}", STANDARD.encode(take(out))))
    }
}

pub fn unprotect(stored: &str) -> Result<String, String> {
    let Some(encoded) = stored.strip_prefix(PREFIX) else {
        // Plaintext from an older version, or an empty field.
        return Ok(stored.to_string());
    };

    let bytes = STANDARD
        .decode(encoded)
        .map_err(|e| format!("stored credential is not valid base64: {e}"))?;

    let input = blob(&bytes);
    let mut out = CRYPT_INTEGER_BLOB::default();

    unsafe {
        CryptUnprotectData(
            &input,
            None,
            None,
            None,
            None,
            CRYPTPROTECT_UI_FORBIDDEN,
            &mut out,
        )
        .ok()
        .map_err(|e| format!("could not decrypt credential: {e}"))?;

        String::from_utf8(take(out)).map_err(|e| format!("decrypted credential is not text: {e}"))
    }
}

// True when every credential on disk is already ciphertext, so a migration save
// can be skipped on launch.
pub fn is_protected(stored: &str) -> bool {
    stored.is_empty() || stored.starts_with(PREFIX)
}
