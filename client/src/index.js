import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { SellerState, UserState, ProductState } from "./Contexts";
import { MoralisProvider } from "react-moralis";
import { BrowserRouter } from "react-router-dom";
const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
const app = (
	<React.StrictMode>
		<MoralisProvider initializeOnMount={false}>
			<SellerState>
				<UserState>
					<ProductState>
						<BrowserRouter>
							<App />
						</BrowserRouter>
					</ProductState>
				</UserState>
			</SellerState>
		</MoralisProvider>
	</React.StrictMode>
);
root.render(app);
