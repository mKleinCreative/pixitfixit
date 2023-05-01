import { 
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button
} from '@mui/material'

const MarkerDialog = (props) => {

  const {open, onClose, markerInfo, comments} = props

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Marker Info</DialogTitle>
      <img src={markerInfo.imgUrl}/>
      <DialogContent>
           {comments.map((comment) => {
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