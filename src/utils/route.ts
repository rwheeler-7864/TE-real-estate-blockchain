// https://www.youtube.com/watch?v=J6jzDfHoj-Y&t=389s
export default interface IRoute {
  path: string;
  name: string;
  exact: boolean;
  component: any;
  props?: any;
}
