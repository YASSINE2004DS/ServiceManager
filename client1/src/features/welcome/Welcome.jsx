import React from 'react';
import { Link } from 'react-router-dom';
import Container from './components/Container';

const Welcome = () => {
    return (
        <Container>
            <h1 className="text-5xl font-extrabold text-blue-500 drop-shadow-lg">
                Bienvenue chez Safarelec
            </h1>

            <p className="text-lg text-gray-300">
                Safarelec est votre partenaire de confiance dans les solutions électriques et les
                innovations technologiques. Découvrez notre plateforme et commencez dès maintenant.
            </p>

            <div className="flex justify-center gap-6 mt-6">
                <Link
                    to="/login"
                    className="w-48 h-12 flex items-center justify-center bg-blue-600 text-white text-base font-medium rounded-xl shadow-md hover:bg-blue-700 transition-all duration-300 ease-in-out"
                >
                    Se connecter
                </Link>

                <Link
                    to="/register"
                    className="w-48 h-12 flex items-center justify-center border border-blue-500 text-blue-500 text-base font-medium rounded-xl shadow-md hover:bg-blue-600 hover:text-white transition-all duration-300 ease-in-out"
                >
                    S'inscrire
                </Link>
            </div>
        </Container>
    );
};

export default Welcome;
