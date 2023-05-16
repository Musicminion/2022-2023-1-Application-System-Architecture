import React from 'react';
import mystyle from './style.module.css';
import clsx from 'clsx';

export default function MainAvatar() {
    return (
        <div>
            <img className={mystyle.MainAvatar} src="/img/logo-avatar.png" alt="ayaka" />
        </div>
    );
}