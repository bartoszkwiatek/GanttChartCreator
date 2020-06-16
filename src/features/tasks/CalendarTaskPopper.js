import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CardHeader, CardContent, CardActions, IconButton, Typography, Card } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { LetterAvatar } from "./LetterAvatar";
import { useState } from "react";
import { DraggableDialog } from "./DraggableDialog";
import { AddTaskDialog } from "./AddTaskDialog";
import { DeleteDialog } from "./DeleteDialog";
import { TaskCompletionIndicator } from "./TaskCompletionIndicator";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
  }
}));

const CalendarTaskPopper = (props) => {
  const classes = useStyles()
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleOpenEdit = () => {
    setOpenEdit(true)
  }

  const handleCloseEdit = () => {
    setOpenEdit(false)
  }

  const handleOpenDelete = () => {
    setOpenDelete(true)
  }

  const handleCloseDelete = () => {
    setOpenDelete(false)
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        title={props.data.title}
        subheader={props.data.category}
        action={
          <TaskCompletionIndicator
            data={props.data}
          />
        }
      />
      <CardContent>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p">
          {props.data.description}
        </Typography>
      </CardContent>
      <CardActions style={{ justifyContent: 'space-between' }}>
        <LetterAvatar responsible={props.data.responsible} />
        <div>
          <IconButton
            aria-label="delete"
            onClick={handleOpenDelete}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            aria-label="edit"
            onClick={handleOpenEdit}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={(event) => props.click(event)}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </div>
      </CardActions>
      <DraggableDialog
        open={openEdit}
        title={'edit'}
        handleClose={handleCloseEdit}
      >
        <AddTaskDialog
          title={'edit'}
          data={props.data}
          handleClose={handleCloseEdit}
        />
      </DraggableDialog>
      <DraggableDialog
        open={openDelete}
        title={'delete'}
        handleClose={handleCloseDelete}
      >
        <DeleteDialog
          title={'delete'}
          task={props.data}
          handleClose={handleCloseDelete}

        />
      </DraggableDialog>
    </Card>
  );
}

export { CalendarTaskPopper }