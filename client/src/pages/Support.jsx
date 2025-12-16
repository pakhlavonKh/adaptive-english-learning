import React, { useState, useEffect } from 'react';
import { createSupportTicket, getSupportTickets } from '../api';

/**
 * Support - Destek Sayfası
 * FR23: Student Contact Form
 * 
 * Öğrencilerin hata bildirimi veya yardım talebi gönderebildiği sayfa.
 * Ayrıca geçmiş destek taleplerini listeleyebilirler.
 */
export default function Support({ token, onBack }) {
  const [activeTab, setActiveTab] = useState('new'); // 'new' veya 'history'
  
  // Yeni talep formu state'leri
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [priority, setPriority] = useState('normal');
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(null);
  
  // Geçmiş talepler
  const [tickets, setTickets] = useState([]);
  const [loadingTickets, setLoadingTickets] = useState(false);

  // Geçmiş talepleri yükle
  const loadTickets = async () => {
    try {
      setLoadingTickets(true);
      const data = await getSupportTickets(token);
      setTickets(data.tickets || []);
    } catch (error) {
      console.error('Destek talepleri yüklenemedi:', error);
    } finally {
      setLoadingTickets(false);
    }
  };

  // Tab değiştiğinde geçmiş talepleri yükle
  useEffect(() => {
    if (activeTab === 'history') {
      loadTickets();
    }
  }, [activeTab]);

  // Form gönder
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!subject.trim() || !message.trim()) {
      setSubmitMessage({ type: 'error', text: 'Lütfen tüm alanları doldurun.' });
      return;
    }

    try {
      setSubmitting(true);
      const result = await createSupportTicket(token, subject, message, priority);
      
      setSubmitMessage({ 
        type: 'success', 
        text: result.message || 'Talebiniz başarıyla gönderildi!'
      });
      
      // Formu temizle
      setSubject('');
      setMessage('');
      setPriority('normal');
      
      // 5 saniye sonra mesajı temizle
      setTimeout(() => setSubmitMessage(null), 5000);
      
    } catch (error) {
      setSubmitMessage({ 
        type: 'error', 
        text: 'Talep gönderilirken hata oluştu. Lütfen tekrar deneyin.' 
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Status renkleri
  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return '#2196f3';
      case 'in_progress': return '#ff9800';
      case 'resolved': return '#4caf50';
      case 'closed': return '#9e9e9e';
      default: return '#666';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'open': return 'Açık';
      case 'in_progress': return 'İşlemde';
      case 'resolved': return 'Çözüldü';
      case 'closed': return 'Kapatıldı';
      default: return status;
    }
  };

  const getPriorityText = (priority) => {
    switch (priority) {
      case 'low': return 'Düşük';
      case 'normal': return 'Normal';
      case 'high': return 'Yüksek';
      case 'urgent': return 'Acil';
      default: return priority;
    }
  };

  const styles = {
    container: {
      maxWidth: '900px',
      margin: '0 auto',
      padding: '20px'
    },
    header: {
      background: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      marginBottom: '20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#667eea',
      margin: 0
    },
    tabs: {
      display: 'flex',
      gap: '12px',
      marginBottom: '20px'
    },
    tab: {
      flex: 1,
      padding: '12px',
      background: 'white',
      border: '2px solid #e0e0e0',
      borderRadius: '8px',
      cursor: 'pointer',
      textAlign: 'center',
      fontWeight: '600',
      transition: 'all 0.3s ease'
    },
    tabActive: {
      background: '#667eea',
      color: 'white',
      borderColor: '#667eea'
    },
    card: {
      background: 'white',
      padding: '24px',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    },
    formGroup: {
      marginBottom: '20px'
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontWeight: '600',
      color: '#333',
      fontSize: '14px'
    },
    input: {
      width: '100%',
      padding: '12px',
      border: '1px solid #ddd',
      borderRadius: '6px',
      fontSize: '14px',
      boxSizing: 'border-box'
    },
    textarea: {
      width: '100%',
      padding: '12px',
      border: '1px solid #ddd',
      borderRadius: '6px',
      fontSize: '14px',
      minHeight: '150px',
      resize: 'vertical',
      fontFamily: 'inherit',
      boxSizing: 'border-box'
    },
    select: {
      width: '100%',
      padding: '12px',
      border: '1px solid #ddd',
      borderRadius: '6px',
      fontSize: '14px',
      boxSizing: 'border-box'
    },
    submitButton: {
      width: '100%',
      padding: '14px',
      background: '#667eea',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'background 0.3s ease'
    },
    message: {
      padding: '12px 16px',
      borderRadius: '6px',
      marginBottom: '20px',
      fontSize: '14px'
    },
    successMessage: {
      background: '#e8f5e9',
      color: '#2e7d32',
      borderLeft: '4px solid #4caf50'
    },
    errorMessage: {
      background: '#ffebee',
      color: '#c62828',
      borderLeft: '4px solid #f44336'
    },
    ticketList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    },
    ticketCard: {
      padding: '16px',
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      transition: 'all 0.2s ease',
      cursor: 'pointer'
    },
    ticketHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '8px'
    },
    ticketSubject: {
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#333',
      flex: 1
    },
    ticketMeta: {
      display: 'flex',
      gap: '12px',
      fontSize: '12px',
      color: '#666',
      marginTop: '8px'
    },
    statusBadge: {
      padding: '4px 12px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: 'bold',
      color: 'white'
    },
    emptyState: {
      textAlign: 'center',
      padding: '60px 20px',
      color: '#999'
    },
    emptyIcon: {
      fontSize: '64px',
      marginBottom: '16px'
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>🎫 Yardım & Destek</h1>
        <button 
          onClick={onBack}
          style={{
            padding: '10px 20px',
            background: '#9e9e9e',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          ← Geri Dön
        </button>
      </div>

      {/* Tabs */}
      <div style={styles.tabs}>
        <div 
          style={{
            ...styles.tab,
            ...(activeTab === 'new' ? styles.tabActive : {})
          }}
          onClick={() => setActiveTab('new')}
        >
          📝 Yeni Talep Oluştur
        </div>
        <div 
          style={{
            ...styles.tab,
            ...(activeTab === 'history' ? styles.tabActive : {})
          }}
          onClick={() => setActiveTab('history')}
        >
          📋 Geçmiş Taleplerim
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'new' ? (
        // Yeni Talep Formu
        <div style={styles.card}>
          <h2 style={{ marginTop: 0, color: '#333' }}>Destek Talebi Oluştur</h2>
          <p style={{ color: '#666', fontSize: '14px', marginBottom: '24px' }}>
            Karşılaştığınız sorun veya yardım talebinizi aşağıdaki form ile bize iletebilirsiniz.
          </p>

          {/* Submit Message */}
          {submitMessage && (
            <div style={{
              ...styles.message,
              ...(submitMessage.type === 'success' ? styles.successMessage : styles.errorMessage)
            }}>
              {submitMessage.text}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Konu */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Konu *</label>
              <input 
                type="text"
                style={styles.input}
                placeholder="Örn: Giriş yapamıyorum"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>

            {/* Öncelik */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Öncelik Seviyesi</label>
              <select 
                style={styles.select}
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="low">Düşük - Genel soru</option>
                <option value="normal">Normal - Standart destek</option>
                <option value="high">Yüksek - Önemli sorun</option>
                <option value="urgent">Acil - Kritik hata</option>
              </select>
            </div>

            {/* Mesaj */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Mesaj *</label>
              <textarea 
                style={styles.textarea}
                placeholder="Sorununuzu veya talebinizi detaylı bir şekilde açıklayın..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              style={styles.submitButton}
              disabled={submitting}
              onMouseEnter={(e) => !submitting && (e.currentTarget.style.background = '#5568d3')}
              onMouseLeave={(e) => !submitting && (e.currentTarget.style.background = '#667eea')}
            >
              {submitting ? 'Gönderiliyor...' : '📤 Talebi Gönder'}
            </button>
          </form>
        </div>
      ) : (
        // Geçmiş Talepler
        <div style={styles.card}>
          <h2 style={{ marginTop: 0, color: '#333' }}>Geçmiş Destek Talepleriniz</h2>
          
          {loadingTickets ? (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>⏳</div>
              <p>Yükleniyor...</p>
            </div>
          ) : tickets.length === 0 ? (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>📭</div>
              <p>Henüz destek talebi oluşturmadınız.</p>
            </div>
          ) : (
            <div style={styles.ticketList}>
              {tickets.map((ticket) => (
                <div 
                  key={ticket.id}
                  style={styles.ticketCard}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                    e.currentTarget.style.borderColor = '#667eea';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = '#e0e0e0';
                  }}
                >
                  <div style={styles.ticketHeader}>
                    <div style={styles.ticketSubject}>#{ticket.id} - {ticket.subject}</div>
                    <div 
                      style={{
                        ...styles.statusBadge,
                        background: getStatusColor(ticket.status)
                      }}
                    >
                      {getStatusText(ticket.status)}
                    </div>
                  </div>
                  
                  <p style={{ color: '#666', fontSize: '14px', margin: '8px 0' }}>
                    {ticket.message.length > 150 
                      ? ticket.message.substring(0, 150) + '...' 
                      : ticket.message}
                  </p>
                  
                  <div style={styles.ticketMeta}>
                    <span>🏷️ Öncelik: {getPriorityText(ticket.priority)}</span>
                    <span>📅 {new Date(ticket.createdAt).toLocaleDateString('tr-TR')}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

