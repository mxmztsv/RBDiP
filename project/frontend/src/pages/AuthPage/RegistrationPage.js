import styles from './AuthPage.module.css';
import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	Checkbox,
	Container,
	FormControlLabel,
	TextField,
	Typography
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {Controller, useForm} from "react-hook-form";
import {useAuthContext} from "../../context/AuthContext";
import {useHttp} from "../../hooks/http.hook";
import toast from "react-hot-toast";

export const RegistrationPage = () => {

	const navigate = useNavigate()
	const {request} = useHttp()
	const {login} = useAuthContext()

	const { handleSubmit, control, reset } = useForm({
		defaultValues: {
			isAdmin: false,
		}
	})

	const onSubmit = async data => {
		// console.log(data)
		try {
			request('/account/sign-up', 'POST', data).then((userData) => {
				toast.success("Выполнена регистрация")
				login(userData)
			})
		} catch (e) {
			toast.error(e.message)
		}
	}

	return (
		<div className={styles.page}>
			<Container>
				<Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
					<Card sx={{ minWidth: 500 }}>
						<CardContent>
							<Typography variant="h4">
								Регистрация
							</Typography>
							<Box component="form" display="flex" flexDirection="column" onSubmit={handleSubmit(onSubmit)}>
								<Box margin="8px 0">
									<Controller
										name={"name"}
										required
										fullWidth
										control={control}
										render={({field: {onChange, value}}) => (
											<TextField onChange={onChange} value={value} label={"Имя"}
											           required
											           fullWidth/>
										)}
									/>
								</Box>
								<Box margin="8px 0">
									<Controller
										name={"surname"}
										required
										fullWidth
										control={control}
										render={({field: {onChange, value}}) => (
											<TextField onChange={onChange} value={value} label={"Фамилия"}
											           required
											           fullWidth/>
										)}
									/>
								</Box>
								<Box margin="8px 0">
									<Controller
										name={"email"}
										required
										fullWidth
										control={control}
										render={({field: {onChange, value}}) => (
											<TextField onChange={onChange} value={value} label={"E-mail"}
											           required
											           type="email"
											           fullWidth/>
										)}
									/>
								</Box>
								<Box margin="8px 0">
									<Controller
										name={"password"}
										required
										fullWidth
										control={control}
										render={({field: {onChange, value}}) => (
											<TextField onChange={onChange} value={value} label={"Пароль"}
											           required
											           type="password"
											           fullWidth/>
										)}
									/>
								</Box>
								<Box margin="8px 0">
									<Controller
										name={"isAdmin"}
										required
										fullWidth
										control={control}
										render={({field}) => (
											<FormControlLabel control={<Checkbox {...field} />} label="Староста группы" />

										)}
									/>
								</Box>
								<CardActions>
									<Button type="submit">
										Зарегистрироваться
									</Button>
									<Button onClick={() => {navigate('/')}}>
										Вход
									</Button>
								</CardActions>
							</Box>
						</CardContent>

					</Card>
				</Box>
			</Container>
		</div>
	)
}
