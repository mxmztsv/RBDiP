import React from "react";
import {Navigate, Route, Routes} from 'react-router-dom'
import {AuthPage} from "./pages/AuthPage/AuthPage";
import {NewsPage} from "./pages/NewsPage/NewsPage";
import {LinksPage} from "./pages/LinksPage/LinksPage";
import {RegistrationPage} from "./pages/AuthPage/RegistrationPage";
import {ChooseGroupPage} from "./pages/GroupPage/ChooseGroupPage";
import {CreateGroupPage} from "./pages/GroupPage/CreateGroupPage";

export const useRoutes = (userData) => {

	// console.log('userData in router', userData)


	if (!userData) {
		return (
			<Routes>
				<Route path="/" element={<AuthPage/>}/>
				<Route path="/sign-up" element={<RegistrationPage/>}/>
				<Route path="*" element={<Navigate to="/" replace/>}/>
			</Routes>
		)
	}

	if (userData.groupName === "" && !userData.isAdmin) {
		return (
			<Routes>
				<Route path="/" element={<ChooseGroupPage />}/>
				<Route path="*" element={<Navigate to="/" replace />}/>
			</Routes>
		)
	}

	if (userData.groupName === "" && userData.isAdmin) {
		return (
			<Routes>
				<Route path="/" element={<CreateGroupPage />}/>
				<Route path="*" element={<Navigate to="/" replace />}/>
			</Routes>
		)
	}

	return (
		<Routes>
			<Route path="/" element={<NewsPage/>}/>
			<Route path="/links" element={<LinksPage/>}/>
			<Route path="*" element={<Navigate to="/" replace/>}/>
		</Routes>
	)
}
