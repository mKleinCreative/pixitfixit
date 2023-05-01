import { 
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button
} from '@mui/material'

const MarkerDialog = (props) => {
  const { open, onClose } = props;

  console.log("shid",props.markerInfo)
  props.getComments(props.markerInfo._id);


  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Marker Info</DialogTitle>
      <DialogContent>
           {props.comments?.map((comment) => {
            return <p>{comment}</p>
          })} 
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default MarkerDialog