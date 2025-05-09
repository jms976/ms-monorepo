import { ShadcnButton } from '@common/ui';
import './App.css';

function App() {
  const test: Nullable<{ a: string }> = { a: 'dd' };
  console.log(test);

  return <ShadcnButton variant="link">ShadCnButton</ShadcnButton>;
}

export default App;
