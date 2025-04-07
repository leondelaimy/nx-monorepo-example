import { useEffect, useState } from 'react';
import NxWelcome from './nx-welcome';

const fetchData = async (): Promise<{
  server1: string;
  server2: string;
}> => {
  const go1 = await fetch('http://localhost:3000');
  const go2 = await fetch('http://localhost:3001');

  const res1 = await go1.json();
  const res2 = await go2.json();

  return {
    server1: JSON.stringify(res1),
    server2: JSON.stringify(res2),
  };
};

export default function App() {
  const [servers, setServers] = useState<{
    server1: string;
    server2: string;
  } | null>(null);

  useEffect(() => {
    let ignore = false;
    fetchData().then((data) => {
      if (!ignore) setServers(data);
    });
    return () => {
      ignore = true;
    };
  }, []);

  console.log(servers);
  return (
    <div>
      <span>{servers?.server1}</span>
      <span>{servers?.server2}</span>
      <NxWelcome title="typescript-react" />
    </div>
  );
}
