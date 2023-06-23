import { useState } from 'react';
import reactLogo from '../assets/react.svg';
import viteLogo from '/vite.svg';
import { Link } from 'react-router-dom';
import Title from 'antd/es/typography/Title';
import { Button, Card, Image, Typography } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';

const { Text } = Typography;

const Home = () => {
  // State variable
  const [count, setCount] = useState(0);

  return (
    <>
      {/* Logos */}
      <div className="flex flex-nowrap items-center justify-center">
        {/* Vite logo */}
        <Link className="hover:animate-spin" href="https://vitejs.dev" target="_blank">
          <Image
            preview={false}
            src={viteLogo}
            className="will-change-filter transition-filter"
            style={{
              height: '6em',
              padding: '1.5em',
            }}
            alt="Vite logo"
          />
        </Link>

        {/* React logo */}
        <Link className="hover:animate-spin" href="https://react.dev" target="_blank">
          <Image
            preview={false}
            src={reactLogo}
            className="will-change-filter transition-filter react"
            style={{
              height: '6em',
              padding: '1.5em',
            }}
            alt="React logo"
          />
        </Link>
      </div>

      {/* Heading */}
      <Title level={1}>Vite + React</Title>

      {/* Card */}
      <Card className="mb-5">
        {/* Count button */}
        <Button className="mb-5" onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>

        {/* Paragraph */}
        <Paragraph>
          Edit <Text code>src/App.jsx</Text> and save to test HMR
        </Paragraph>
      </Card>

      {/* Read the docs paragraph */}
      <Paragraph className="read-the-docs">Click on the Vite and React logos to learn more</Paragraph>
    </>
  );
};

export default Home;
