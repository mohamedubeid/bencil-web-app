// import { Typography, Container, Button } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import classes from "./NotFound.module";


// const NotFound = () => {
//   const navigate = useNavigate();
//   return (
//     <Container style={classes.root}>
//       <img style={classes.image} src="/images/404-error.svg" alt="404 Error" />
//       <div>
//         <Typography style={classes.message} variant="h5">
//           Oops! Looks like this page doesn't exist.
//         </Typography>
//         <Typography variant="body1">
//           The link you followed may be broken or the page may have been removed.
//         </Typography>
//         <Button
//           variant="contained"
//           sx={classes.navigate_button}
//           onClick={() => navigate( "/" )}
//         >
//           Go To The Main Page
//         </Button>
//       </div>
//     </Container>
//   );
// };

// export default NotFound;


import { Typography, Container, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import classes from "./NotFound.module";

const NotFound = (): JSX.Element => {
  const navigate = useNavigate();
  return (
    <Container sx={classes.root}>
      <img style={classes.image} src="/images/404-error.svg" alt="404 Error" />
      <div>
        <Typography style={classes.message} variant="h5">
          Oops! Looks like this page doesn't exist.
        </Typography>
        <Typography variant="body1">
          The link you followed may be broken or the page may have been removed.
        </Typography>
        <Button
          variant="contained"
          sx={classes.navigate_button}
          onClick={() => navigate( "/" )}
        >
          Go To The Main Page
        </Button>
      </div>
    </Container>
  );
};

export default NotFound;
