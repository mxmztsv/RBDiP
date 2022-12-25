import {Header} from "../../components/Header/Header";
import {Box, Button, Card, CardActions, CardContent, Container, TextField, Typography} from "@mui/material";
import {Controller, useForm} from "react-hook-form";
import {useHttp} from "../../hooks/http.hook";
import toast from "react-hot-toast";
import {useAuthContext} from "../../context/AuthContext";

export const CreateGroupPage = () => {

	const {request} = useHttp()
	const {login, userData} = useAuthContext()

	const {handleSubmit, control} = useForm({
		defaultValues: {
			name: "",
		}
	})

	const onSubmit = async data => {
		// console.log(data)
		request(`/groups`, 'POST', data, true).then(() => {
			toast.success('Новая группа добавлена')
			const user = userData
			user.groupName = data.name
			user.isAdmin = true
			login(user)
			window.location.reload()
		})
	}


	return (
		<>
			<Header/>
			<Container>
				<Box sx={{display: "flex", alignItems: "center", justifyContent: "center", height: "90vh"}}>
					<Card sx={{minWidth: 500}}>
						<CardContent>
							<Typography variant="h4">
								Добавьте свою учебную группу
							</Typography>
							<Box component="form" display="flex" flexDirection="column"
							     onSubmit={handleSubmit(onSubmit)}>
								<Box margin="30px 0 8px 0">
									<Controller
										name={"name"}
										required
										fullWidth
										control={control}
										render={({field: {onChange, value}}) => (
											<TextField onChange={onChange} value={value} label={"Название группы"}
											           required
											           fullWidth/>
										)}
									/>
								</Box>
								<CardActions>
									<Button type="submit">
										Добавить
									</Button>
								</CardActions>
							</Box>
						</CardContent>
					</Card>
				</Box>
			</Container>
		</>
	)
}
