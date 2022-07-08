import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(10),
    justifyContent: 'center',
    maxWidth: '500px'
  },

  form: {
    display: 'inline',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  //fileInput: {
    //width: '10%',
    //margin: '10px 0',
  //},
  buttonSubmit: {
    marginBottom: 1,
    marginTop: 10,
    justifyContent: 'center',
  },
}));