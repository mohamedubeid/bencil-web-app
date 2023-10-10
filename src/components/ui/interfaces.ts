export interface SimpleAlertMessageProps {
  message: string;
  duration?: number;
  open: boolean;
  severity?: 'success' | 'warning' | 'error';
  handleClose: () => void;
}