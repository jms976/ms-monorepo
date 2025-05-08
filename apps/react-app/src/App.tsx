import { Button } from '@common/ui';
import { palette } from '@common/styles';
import './App.css';

function App() {
  const test: Nullable<{ a: string }> = { a: 'dd' };
  console.log(test);

  return <Button color={palette.lime[9]} content="React App" />;
}

export default App;
