import { EncryptStorage } from 'encrypt-storage';

export const encryptStorage1 = new EncryptStorage('secret-key-value', {
  prefix: '@instance1',
  
});

export const encryptStorage2 = new EncryptStorage('secret-key-value', {
  prefix: '@xample',
  storageType: 'sessionStorage',
});

// encryptStorage1.setItem('any-key', 'any-value');
// encryptStorage2.setItem('any-key', 'any-value');