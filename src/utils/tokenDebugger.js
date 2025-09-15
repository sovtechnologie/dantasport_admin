import Cookies from 'js-cookie';

/**
 * Token debugging utility for development purposes
 * Only works in development mode
 */
export const tokenDebugger = {
  /**
   * Log current token information
   */
  logCurrentToken() {
    if (process.env.NODE_ENV !== 'development') {
      console.warn('Token debugger only works in development mode');
      return;
    }

    const token = Cookies.get('token');
    if (token) {
      console.log('🔍 Current Token Debug Info:', {
        exists: true,
        length: token.length,
        preview: token.substring(0, 20) + '...',
        fullToken: token, // Full token for development
        expires: Cookies.get('token') ? 'Set in cookies' : 'Not in cookies'
      });
    } else {
      console.log('🔍 Current Token Debug Info:', {
        exists: false,
        message: 'No token found in cookies'
      });
    }
  },

  /**
   * Clear token and log the action
   */
  clearToken() {
    if (process.env.NODE_ENV !== 'development') {
      console.warn('Token debugger only works in development mode');
      return;
    }

    console.log('🗑️ Clearing token...');
    Cookies.remove('token');
    console.log('✅ Token cleared');
  },

  /**
   * Set a test token (for development only)
   */
  setTestToken(token) {
    if (process.env.NODE_ENV !== 'development') {
      console.warn('Token debugger only works in development mode');
      return;
    }

    console.log('🧪 Setting test token:', token);
    Cookies.set('token', token, { expires: 7, path: "/" });
    console.log('✅ Test token set');
  }
};

// Make it available globally in development
if (process.env.NODE_ENV === 'development') {
  window.tokenDebugger = tokenDebugger;
  console.log('🛠️ Token debugger available at window.tokenDebugger');
  console.log('Available methods: logCurrentToken(), clearToken(), setTestToken(token)');
}
