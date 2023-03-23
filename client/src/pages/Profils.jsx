import React from 'react'

export default function Profils({ userData }) {
    
    return (
        <div className="auth-wrapper">
            <div className="auth-inner">
                <div>
                    Name<h1>{userData.username}</h1>
                    Email <h1>{userData.email}</h1>
                    <br />
                </div>
            </div>
        </div>
    );
}