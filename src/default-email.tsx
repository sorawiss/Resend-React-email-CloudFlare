function DefaultEmail({ name }: { name: string }) {
    return (
        <div style={{
            fontFamily: 'Arial, sans-serif',
            maxWidth: '600px',
            margin: '0 auto',
            backgroundColor: '#f8f9fa',
            padding: '20px'
        }}>
            <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                padding: '40px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                textAlign: 'center'
            }}>
                {/* Header */}
                <div style={{
                    marginBottom: '30px'
                }}>
                    <h1 style={{
                        color: '#2c3e50',
                        fontSize: '28px',
                        margin: '0 0 10px 0',
                        fontWeight: 'bold'
                    }}>
                        🎉 Welcome aboard, {name}!
                    </h1>
                    <p style={{
                        color: '#7f8c8d',
                        fontSize: '16px',
                        margin: '0',
                        lineHeight: '1.5'
                    }}>
                        Just test message
                    </p>
                </div>

              

               
            </div>
        </div>
    )
}

export default DefaultEmail