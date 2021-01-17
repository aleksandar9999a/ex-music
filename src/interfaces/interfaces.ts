export interface IRoute {
  id: string | number,
  path: string,
  Component: React.FC<any>,
  type: 'menu' | string,
  title: string,
  props: { [key: string]: any }
}