import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {useForm, Controller} from "react-hook-form";
import {Box} from "@mui/material";
import {useEffect, useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {BASE_URL} from "../../config";
import {useAuthContext} from "../../context/AuthContext";
import {useHttp} from "../../hooks/http.hook";

export const EditPostModal = ({isOpen, close, id = null, updateNews = () => {}}) => {

	const [formFile, setFormFile] = useState(null)

	const {userData} = useAuthContext()
	const {request} = useHttp()

	const { handleSubmit, control, reset, setValue } = useForm({
		defaultValues: {
			title: "",
			body: ""
		}
	})

	const onSubmit = data => {
		// console.log(data)
		const formData = new FormData()
		formData.append('title', data.title)
		formData.append('body', data.body)
		if (formFile) {
			formData.append('attachment', formFile)
		}
		try {
			const config = {
				headers: {
					'content-type': 'multipart/form-data',
					'Token': `Bearer ${userData.accessToken}`
				},
			}
			if (id) {
				axios.patch(`${BASE_URL}/posts/${id}`, formData, config).then((response) => {
					toast.success('Новость обновлена')
					updateNews()
				})
			} else {
				axios.post(`${BASE_URL}/posts`, formData, config).then((response) => {
					toast.success('Новость добавлена')
					updateNews()
					reset()
					close()
				})
			}
		} catch (e) {
			console.error(e.message)
			toast.error(e.message)
		}
	}

	const handleFormFileInput = (event) => {
		setFormFile(event.target.files[0])
	}

	const fetchPost = async () => {
		request(`/posts/${id}`, 'GET', null, true).then((response) => {
			setValue("title", response.title)
			setValue("body", response.body)
		})
	}

	useEffect(() => {
		if (id) {
			fetchPost()
		}
	}, [id])


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
					<Box margin="20px 0 20px 0">
						<input type="file" id="file" name="file" className="file-input" onChange={handleFormFileInput}/>
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
