/***********************************************************************************************************************
 * @file secureStorage.ts
 *
 * @brief Secure storage utility for localStorage operations
 *
 * @description This module provides a secure wrapper around localStorage with validation,
 *              size limitations, and comprehensive error handling.
 *
 * @dependencies None
 *
 * @author Ayyoub el kouri
 * @date 13/06/2025
 * @lastUpdate 13/06/2025
 **********************************************************************************************************************/

// Configuration
const STORAGE_PREFIX: string = 'serviceManager_';
const MAX_STORAGE_SIZE: number = 5 * 1024 * 1024; // 5MB

/**
 * @function isStorageAvailable
 * @description Checks if localStorage is available and working in the current browser
 *
 * @returns {boolean} True if localStorage is available and functional, false otherwise
 *
 * @author Ayyoub el kouri
 * @date 13/06/2025
 * @lastUpdate 13/06/2025
 */
const isStorageAvailable = (): boolean => {
    try {
        if (typeof Storage === 'undefined') return false;

        // Write/read test to verify functionality
        const testKey = '__storage_test__';
        localStorage.setItem(testKey, 'test');
        localStorage.removeItem(testKey);
        return true;
    } catch (error) {
        return false;
    }
};

/**
 * @function validateParams
 * @description Validates storage operation parameters
 *
 * @param {string} key The key to validate
 * @param {any} value The value to validate (optional)
 * @param {boolean} requireValue Whether the value is required
 *
 * @returns {boolean} True if parameters are valid, false otherwise
 *
 * @author Ayyoub el kouri
 * @date 13/06/2025
 * @lastUpdate 13/06/2025
 */
const validateParams = (key: string, value: any = null, requireValue: boolean = false): boolean => {
    if (!key || typeof key !== 'string' || key.trim() === '') {
        console.error('SecureStorage: Invalid or missing key');
        return false;
    }

    if (key.length > 1000) {
        console.error('SecureStorage: Key too long');
        return false;
    }

    if (requireValue && (value === null || value === undefined)) {
        console.error('SecureStorage: Value required but missing');
        return false;
    }

    return true;
};

/**
 * @function getPrefixedKey
 * @description Prepends the storage prefix to the provided key
 *
 * @param {string} key The original key
 *
 * @returns {string} The key with app prefix added
 *
 * @author Ayyoub el kouri
 * @date 13/06/2025
 * @lastUpdate 13/06/2025
 */
const getPrefixedKey = (key: string): string => `${STORAGE_PREFIX}${key}`;

/**
 * @function setData
 * @description Stores data in localStorage with validation and error handling
 *
 * @param {string} key The key under which to store the data
 * @param {any} value The data to store
 *
 * @returns {boolean} True if operation was successful, false otherwise
 *
 * @author Ayyoub el kouri
 * @date 13/06/2025
 * @lastUpdate 13/06/2025
 */
const setData = <T>(key: string, value: T): boolean => {
    try {
        // Parameter validation
        if (!validateParams(key, value, true)) {
            console.error('SecureStorage: invalid parameters for setData!');
            return false;
        }

        // Check storage availability
        if (!isStorageAvailable()) {
            console.error('SecureStorage: localStorage not available');
            return false;
        }

        const prefixedKey = getPrefixedKey(key);
        const serializedValue = typeof value === 'string' ? value : JSON.stringify(value);

        // Size check
        if (serializedValue.length > MAX_STORAGE_SIZE) {
            console.error('SecureStorage: Data too large');
            return false;
        }

        localStorage.setItem(prefixedKey, serializedValue);
        return true;
    } catch (error: any) {
        console.error('SecureStorage: Error during storage', {
            key,
            error: error.message,
            name: error.name,
        });

        // Specific handling for quota errors
        if (error.name === 'QuotaExceededError') {
            console.warn('SecureStorage: Storage quota exceeded');
        }

        return false;
    }
};

/**
 * @function getData
 * @description Retrieves data from localStorage with error handling
 *
 * @param {string} key The key to retrieve
 * @param {any} defaultValue The default value to return if key doesn't exist
 *
 * @returns {T|null} The retrieved data or defaultValue if not found
 *
 * @author Ayyoub el kouri
 * @date 13/06/2025
 * @lastUpdate 13/06/2025
 */
const getData = <T>(key: string, defaultValue: T | null = null): T | null => {
    try {
        if (!validateParams(key)) {
            return defaultValue;
        }

        if (!isStorageAvailable()) {
            console.error('SecureStorage: localStorage not available');
            return defaultValue;
        }

        const prefixedKey = getPrefixedKey(key);
        const item = localStorage.getItem(prefixedKey);

        if (item === null) {
            return defaultValue;
        }

        // Try JSON parsing, otherwise return string
        try {
            const parsed = JSON.parse(item);
            return parsed as T;
        } catch {
            return item as unknown as T;
        }
    } catch (error: any) {
        console.error('SecureStorage: Error during retrieval', {
            key,
            error: error.message,
        });
        return defaultValue;
    }
};

/**
 * @function removeData
 * @description Removes data from localStorage
 *
 * @param {string} key The key to remove
 *
 * @returns {boolean} True if operation was successful, false otherwise
 *
 * @author Ayyoub el kouri
 * @date 13/06/2025
 * @lastUpdate 13/06/2025
 */
const removeData = (key: string): boolean => {
    try {
        if (!validateParams(key)) {
            return false;
        }

        if (!isStorageAvailable()) {
            console.error('SecureStorage: localStorage not available');
            return false;
        }

        const prefixedKey = getPrefixedKey(key);
        localStorage.removeItem(prefixedKey);
        return true;
    } catch (error: any) {
        console.error('SecureStorage: Error during removal', {
            key,
            error: error.message,
        });
        return false;
    }
};

/**
 * @function clearAppData
 * @description Clears all application data from localStorage
 *
 * @returns {boolean} True if operation was successful, false otherwise
 *
 * @author Ayyoub el kouri
 * @date 13/06/2025
 * @lastUpdate 13/06/2025
 */
const clearAppData = (): boolean => {
    try {
        if (!isStorageAvailable()) {
            console.error('SecureStorage: localStorage not available');
            return false;
        }

        // get all keys to remove
        const keys = Object.keys(localStorage);
        const keysToRemove = keys.filter(key => key.startsWith(STORAGE_PREFIX));

        // Remove keys
        keysToRemove.forEach((key) => {
            localStorage.removeItem(key);
        });

        return true;
    } catch (error: any) {
        console.error('SecureStorage: Error during cleanup', {
            error: error.message,
        });
        return false;
    }
};

/**
 * @function hasData
 * @description Checks if data exists for the given key
 *
 * @param {string} key The key to check
 *
 * @returns {boolean} True if the key exists, false otherwise
 *
 * @author Ayyoub el kouri
 * @date 13/06/2025
 * @lastUpdate 13/06/2025
 */
const hasData = (key: string): boolean => {
    try {
        if (!validateParams(key)) {
            return false;
        }

        if (!isStorageAvailable()) {
            return false;
        }

        const prefixedKey = getPrefixedKey(key);
        return localStorage.getItem(prefixedKey) !== null;
    } catch (error: any) {
        console.error('SecureStorage: Error during check', {
            key,
            error: error.message,
        });
        return false;
    }
};

// Interface definition for SecureStorage
interface SecureStorage {
    setData: <T>(key: string, value: T) => boolean;
    getData: <T>(key: string, defaultValue?: T | null) => T | null;
    removeData: (key: string) => boolean;
    clearAppData: () => boolean;
    hasData: (key: string) => boolean;
    isStorageAvailable: () => boolean;
}

// Export functions
const secureStorage: SecureStorage = {
    setData,
    getData,
    removeData,
    clearAppData,
    hasData,
    isStorageAvailable,
};

export default secureStorage;

// Named export for compatibility
export { setData, getData, removeData, clearAppData, hasData, isStorageAvailable };
/**
 * @component Compnent
 * @description ...
 *
 * @dependencies ...
 * 
 *
 * @author Ayyoub el kouri
 * @date 13/06/2025
 * @lastUpdate 13/06/2025
 */