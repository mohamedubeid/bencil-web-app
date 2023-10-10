import { Typography, Container, Button } from "@mui/material";
import classes from "./NotFound.module";
import { useRouter } from "../../routes/hooks";
import { paths } from "../../routes/paths";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  const router = useRouter();
  return (
      <>
        <Helmet><title>404</title></Helmet>
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
              onClick={() => router.replace(paths.root)}
            >
              Go To The Main Page
            </Button>
          </div>
        </Container>
      </>
  );
};

export default NotFound;
