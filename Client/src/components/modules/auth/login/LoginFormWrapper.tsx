'use client';

import { useEffect, useState } from 'react';
import LoginForm from './LoginForm';

const LoginFormWrapper = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? <LoginForm /> : null;
};

export default LoginFormWrapper;
