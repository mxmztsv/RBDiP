import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {useForm, Controller} from "react-hook-form";
import {Box} from "@mui/material";
import toast from "react-hot-toast";
import {useHttp} from "../../hooks/http.hook";
import {useEffect} from "react";

export const EditLinkModal = ({isOpen, close, id = null, updateLinks = () => {}}) => {

	const {request} = useHttp()

	const { handleSubmit, control, reset, setValue } = useForm({
		defaultValues: {
			title: "",
			link: ""
		}
	})

	const fetchLink = async () => {
		request(`/links/${id}`, 'GET', null, true).then((response) => {
			setValue("title", response.title)
			setValue("link", response.link)
		})
	}

	const onSubmit = data => {
		// console.log(data)
		if (id) {
			request(`/links/${id}`, 'PATCH', data, true).then(() => {
				toast.success('Ссылка обновлена')
				updateLinks()
			})
		} else {
			request('/links', 'POST', data, true).then(() => {
				toast.success('Новая ссылка добавлена')
				updateLinks()
				reset()
				close()
			})
		}
	}

	useEffect(() => {
		if (id) {
			fetchLink()
		}
	}, [id])


	return (
		<Dialog open={isOpen} onClose={() => {
			reset()
			close()
		}} fullWidth>
			<DialogTitle>Редактор ссылки</DialogTitle>
			<DialogContent>
				<Box component="form" onSubmit={handleSubmit(onSubmit)}>
					<Box margin="20px 0 20px 0">
						<Controller
							name={"title"}
							required
							fullWidth
							control={control}
							render={({field: {onChange, value}}) => (
								<TextField onChange={onChange} value={value} label={"Название"}
								           required
								           fullWidth/>
							)}
						/>
					</Box>
					<Box>
						<Controller
							name={"link"}
							required
							fullWidth
							control={control}
							render={({field: {onChange, value}}) => (
								<TextField onChange={onChange} value={value} label={"Ссылка"}
								           required
								           fullWidth
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
