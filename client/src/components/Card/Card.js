import React from 'react';
import { Link } from 'react-router-dom';
import './Card.scss';

const Card = ({ projects, author }) => {
    return (
			<React.Fragment>
				{projects.map(project => {
						return (
							<div key={project.id} className="user-project__card">
								<Link to={`/projeto/${project.handle}`}>
									<img 
										className="user-project__img" 
										src={`http://localhost:5000/uploads/${project.img}`}
										alt="Capa do projeto"
									/>
									<div className="user-project__content">
										<h1 className="user-project__title title has-text-danger">{project.name}</h1>
										<div className="user-project__description has-text-dark">
										{project.description && project.description.length > 180
												? project.description.substr(0, 179) + '...'
												: project.description
										}
										</div>
										{author && <p className="user-project__author has-text-danger">{`Por: ${project.userName}`}</p>}
									</div>
								</Link>
							</div>
						);
				})}
			</React.Fragment>
    )
}

export default Card;