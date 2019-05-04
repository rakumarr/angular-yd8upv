export interface NavItem {
  displayName: string;
  name: string;
  disabled?: boolean;
  route?: string;
  children?: NavItem[];
}