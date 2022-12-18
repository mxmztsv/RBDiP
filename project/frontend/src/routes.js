import React from "react";
import {Routes, Route} from 'react-router-dom'
import {AuthPage} from "./pages/AuthPage/AuthPage";
import {NewsPage} from "./pages/NewsPage/NewsPage";
import {LinksPage} from "./pages/LinksPage/LinksPage";

export const useRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<AuthPage />}/>
			<Route path="/news" element={<NewsPage />}/>
			<Route path="/links" element={<LinksPage />}/>
		</Routes>
	)
}
