import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi';
import './style.css'
import logo from '../../assets/logo.svg';
import api from '../../services/api';
import axios from 'axios';
import { LeafletMouseEvent } from 'leaflet';
import { Map, TileLayer, Marker } from 'react-leaflet';

interface Item {
	id: number;
	title: string;
	image_url: string;
}

interface IBGEUFResponse {
	sigla: string;
	nome: string;
}

interface IBGECityResponse {
	nome: string;
}

const CreatePoint = () => {
	const [items, setItems] = useState<Item[]>([]);
	const [ufs, setUfs] = useState<string[]>([]);
	const [ufNames, setUfNames] = useState<string[]>([]);
	const [cities, setCities] = useState<string[]>([]);
	const [selectedUf, setSelectedUf] = useState('0');
	const [selectedCity, setSelectedCity] = useState('0');
	const [selectedItems, setSelectedItems] = useState<number[]>([]);
	const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);
	const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]);
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		whatsapp: '',
	}); 

	const history = useHistory();

	useEffect(() => {
		api.get('items').then(response => {
			setItems(response.data);
		});

		axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
			setUfs(response.data.map(uf => uf.sigla));
			setUfNames(response.data.map(uf => uf.nome));
		});

		navigator.geolocation.getCurrentPosition(position => {
			setInitialPosition([position.coords.latitude, position.coords.longitude])
		})
	}, []);

	useEffect(() => {
		if (selectedUf === '0') {
			return;
		}
		axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then(response => {
			setCities(response.data.map(city => city.nome));
		});
	}, [selectedUf]);

	function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
		setFormData({ ...formData, [event.target.name]: event.target.value});
	}

	async function handleSubmit(event: React.FormEvent) {
		event.preventDefault();
		const {name, email, whatsapp} = formData;
		const state = selectedUf;
		const city = selectedCity
		const [latitude, longitude] = selectedPosition;
		const items = selectedItems;
		const data = {
			name,
			email,
			whatsapp,
			state,
			city,
			latitude,
			longitude,
			items
		}
		await api.post('points', data);
		alert('Point created!');

		history.push('/');
	}
	
	return (
		<div id="page-create-point">
			<header>
				<img src={logo} alt="Ecoleta" />

				<Link to="/">
					<FiArrowLeft />
          Return to home
        </Link>
			</header>

			<form onSubmit={handleSubmit}>
				<h1>Waste point creation</h1>

				<fieldset>
					<legend>
						<h2>Essential data</h2>
					</legend>

					<div className="field">
						<label htmlFor="name">Entity name</label>
						<input type="text" name="name" id="name" onChange={handleInputChange}/>
					</div>

					<Map center={initialPosition} zoom={15} onClick={(event: LeafletMouseEvent) => {
						setSelectedPosition([event.latlng.lat, event.latlng.lng]);
					}}>
						<TileLayer attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
						<Marker position={selectedPosition}/>
					</Map>

					<div className="field-group">
						<div className="field">
							<label htmlFor="email">E-mail</label>
							<input type="email" name="email" id="email" onChange={handleInputChange}/>
						</div>
						<div className="field">
							<label htmlFor="whatsapp">Whatsapp</label>
							<input type="text" name="whatsapp" id="whatsapp" onChange={handleInputChange}/>
						</div>
					</div>
				</fieldset>

				<fieldset>
					<legend>
						<h2>Address</h2>
						<span>Select your address on the map</span>
					</legend>

					<div className="field-group">
						<div className="field">
							<label htmlFor="state">State</label>
							<select name="state" id="state" value={selectedUf} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
								setSelectedUf(event.target.value);
							}}>
								<option value="0">Select your state</option>
								{ufs.map((uf, index) => (
									<option key={uf} value={uf}>{"("+uf+") "+ufNames[index]}</option>
								))}
							</select>
						</div>
						<div className="field">
							<label htmlFor="city">City</label>
							<select name="city" id="city" onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
								setSelectedCity(event.target.value);
							}}>
								<option value="0">Select your city</option>
								{cities.map((city) => (
									<option key={city} value={city}>{city}</option>
								))}
							</select>
						</div>
					</div>
				</fieldset>

				<fieldset>
					<legend>
						<h2>Collection items</h2>
						<span>Select one or more items below</span>
					</legend>

					<ul className="items-grid">
						{items.map((item) => (
							<li key={item.id} className={selectedItems.includes(item.id) ? 'selected' : ''} onClick={() => {
								let id = item.id;
								if (selectedItems.findIndex(itemT => itemT === id) >= 0) {
									setSelectedItems(selectedItems.filter(itemT => itemT !== id));
								} else
								setSelectedItems([...selectedItems, id]);
							}}>
								<img src={item.image_url} alt={item.title}/>
								<span>{item.title}</span>
							</li>
						))}
					</ul>
				</fieldset>

				<button type="submit">
					Register waste point
				</button>
			</form>
		</div>
	);
}

export default CreatePoint;