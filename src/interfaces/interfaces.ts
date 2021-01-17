export interface IRoute {
  id: string | number,
  path: string,
  component: React.FC,
  type: 'menu' | string,
  title: string
}