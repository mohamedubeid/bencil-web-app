import { TIME_TO_SENT_ANOTHER_CODE } from '../../config/variables';
import { SimpleAlertMessageProps } from '../../components/ui/interfaces';


export const handleSendingCode = (
  setAnotherCodeAlrt: ( value: React.SetStateAction<Omit<SimpleAlertMessageProps, "handleClose" | "duration">> ) => void
  , TTAC: number = TIME_TO_SENT_ANOTHER_CODE
): void => {
  const getLastSentTimestamp: string = localStorage.getItem( 'bencil-last-sent-time-stamp' ) || '0';
  const lastSentTimestamp: number = parseInt( getLastSentTimestamp, 10 );

  if ( lastSentTimestamp !== 0 ) {
    const timeDifference = Date.now() - lastSentTimestamp;

    if ( timeDifference >= TTAC ) {
      // Sent another code
      const currentTimeStamp: string = Date.now().toString();
      localStorage.setItem( 'bencil-last-sent-time-stamp', currentTimeStamp );

      setAnotherCodeAlrt( ( prevState ) => ( {
        ...prevState,
        open: true,
        severity: 'success',
        message: 'Another code sent successfully',
      } ) );
    } else {
      const leftTimeToSentAnotherCode = TTAC - timeDifference;
      const leftMin = Math.floor( leftTimeToSentAnotherCode / 60000 );
      const leftSec = Math.floor( ( leftTimeToSentAnotherCode % 60000 ) / 1000 );

      setAnotherCodeAlrt( ( prevState ) => ( {
        ...prevState,
        open: true,
        severity: 'warning',
        message: `You need to wait ${leftMin}:${leftSec} before sending another code`,
      } ) );
    }
  } else {
    //sent code
    setAnotherCodeAlrt( ( prevState ) => ( {
      ...prevState,
      open: true,
      severity: 'success',
      message: 'Another code sent successfully'
    } ) );
    const currentTimeStamp: string = Date.now().toString();
    localStorage.setItem( 'bencil-last-sent-time-stamp', currentTimeStamp );
  }
}
