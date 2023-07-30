import React from 'react';
import mystyle from './style.module.css';
import clsx from 'clsx';
import config from '@generated/docusaurus.config';

export default function MainAvatar() {
    return (
        <div>
            <img className={mystyle.MainAvatar} src={config.baseUrl + "img/logo-avatar.png"} alt="ayaka" />
        </div>
    );
}
