import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../api/axios'
import PhoneInput from '../components/PhoneInput'

export default function Register() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        full_name: '',
        phone: '',
        passport_series: '',
        passport_number: '',
        passport_issued_by: '',
        passport_issue_date: ''
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        setSuccess('')

        try {
            await api.post('/auth/register', formData)
            setSuccess('Регистрация успешна! Перенаправление на вход...')
            setTimeout(() => navigate('/login'), 2000)
        } catch (error) {
            setError(error.response?.data?.detail || 'Ошибка регистрации')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={{ maxWidth: '450px', margin: '50px auto', padding: '30px', background: 'white', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <h1 style={{ color: '#1e3a8a', textAlign: 'center' }}>Регистрация клиента</h1>

            {error && <div style={{ background: '#fee', color: '#c00', padding: '10px', borderRadius: '5px', marginBottom: '15px' }}>{error}</div>}
            {success && <div style={{ background: '#efe', color: '#0a0', padding: '10px', borderRadius: '5px', marginBottom: '15px' }}>{success}</div>}

            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email *" required style={inputStyle}
                       value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />

                <input type="password" placeholder="Пароль *" required minLength={8} style={inputStyle}
                       value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />

                <input type="text" placeholder="ФИО *" required style={inputStyle}
                       value={formData.full_name} onChange={(e) => setFormData({...formData, full_name: e.target.value})} />

                <PhoneInput 
                       value={formData.phone} 
                       onChange={(val) => setFormData({...formData, phone: val})} 
                />

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <input type="text" placeholder="Серия паспорта *" required maxLength={4} style={inputStyle}
                           value={formData.passport_series} onChange={(e) => setFormData({...formData, passport_series: e.target.value})} />
                    <input type="text" placeholder="Номер паспорта *" required maxLength={6} style={inputStyle}
                           value={formData.passport_number} onChange={(e) => setFormData({...formData, passport_number: e.target.value})} />
                </div>

                <input type="text" placeholder="Кем выдан паспорт *" required style={inputStyle}
                       value={formData.passport_issued_by} onChange={(e) => setFormData({...formData, passport_issued_by: e.target.value})} />

                <label style={{ display: 'block', marginTop: '10px', color: '#374151', fontSize: '14px' }}>
                    Дата выдачи паспорта *
                </label>
                <input type="date" required style={{ ...inputStyle, marginTop: '6px' }}
                       value={formData.passport_issue_date} onChange={(e) => setFormData({...formData, passport_issue_date: e.target.value})} />

                <button type="submit" disabled={loading} style={buttonStyle}>
                    {loading ? 'Регистрация...' : 'Зарегистрироваться'}
                </button>
            </form>

            <p style={{ textAlign: 'center', marginTop: '20px' }}>
                <Link to="/login">← Назад ко входу</Link>
            </p>
        </div>
    )
}

const inputStyle = {
    width: '100%',
    padding: '12px',
    margin: '10px 0',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '16px',
    boxSizing: 'border-box'
}

const buttonStyle = {
    width: '100%',
    padding: '14px',
    background: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    marginTop: '10px'
}
