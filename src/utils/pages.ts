import Permit from '../pages/permit';

export default interface IPage {
  name: string;
  permits: typeof Permit[];
}
