import { 
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button
} from '@mui/material'

const MarkerDialog = async (props) => {
  // const { open, onClose } = props;
  const comments = await props.getComments(props.markerInfo._id);
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>Marker Info</DialogTitle>
      <img src={props.markerInfo.imgUrl}/>
      <DialogContent>
           {props.comments.map((comment) => {
            return <p>{comment}</p>
          })} 
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default MarkerDialog