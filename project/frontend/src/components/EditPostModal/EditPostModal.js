import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {useForm, Controller} from "react-hook-form";
import {Box} from "@mui/material";

export const EditPostModal = ({isOpen, close, id = null}) => {

	const { handleSubmit, control, reset } = useForm({
		defaultValues: {
			title: "",
			body: ""
		}
	})

	const onSubmit = data => console.log(data)

	return (
		<Dialog open={isOpen} onClose={() => {
			reset()
			close()
		}} fullWidth>
			<DialogTitle>Редактор новости</DialogTitle>
			<DialogContent>
				{/*<DialogContentText>*/}
				{/*	To subscribe to this website, please enter your email address here. We*/}
				{/*	will send updates occasionally.*/}
				{/*</DialogContentText>*/}
				<Box component="form" onSubmit={handleSubmit(onSubmit)}>
					<Box margin="20px 0 20px 0">
						<Controller
							name={"title"}
							required
							fullWidth
							control={control}
							render={({field: {onChange, value}}) => (
								<TextField onChange={onChange} value={value} label={"Заголовок"}
								           required
								           fullWidth/>
							)}
						/>
					</Box>
					<Box>
						<Controller
							name={"body"}
							required
							fullWidth
							control={control}
							render={({field: {onChange, value}}) => (
								<TextField onChange={onChange} value={value} label={"Текст"}
								           required
								           fullWidth
								           multiline
								           rows={5}
								/>
							)}
						/>
					</Box>
					<DialogActions sx={{margin: "20px 0 0 0"}}>
						<Button type="submit">Сохранить</Button>
						<Button onClick={() => {
							reset()
							close()
						}}>Отмена</Button>
					</DialogActions>
				</Box>
			</DialogContent>
		</Dialog>
	);
}
