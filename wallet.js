(function () {
  const STORAGE_KEY = 'wallet-sim-state-v2';
  const rnd = (n) => Array.from({length:n},()=> 'abcdef0123456789'[Math.floor(Math.random()*16)]).join('');
  const makeAddress = () => `0x${rnd(40)}`;
  const makePrivateKey = () => `0x${rnd(64)}`;
  const makeTxId = () => `0x${rnd(64)}`;
  const isValidAddress = (a) => /^0x[a-fA-F0-9]{40}$/.test(a || '');
  const nowIso = () => new Date().toISOString();
  const def = () => ({ 
    wallets: [
      { id: 1, name: 'Wallet 1', wallet: null, balance: 0, transactions: [] },
      { id: 2, name: 'Wallet 2', wallet: null, balance: 0, transactions: [] }
    ],
    activeWalletId: 1 
  });

  function loadState(){ 
    try { 
      const x = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null'); 
      if (!x || !Array.isArray(x.wallets)) return def();
      return {
        wallets: x.wallets.map(w => ({
          id: w.id || 1,
          name: w.name || 'Wallet',
          wallet: w.wallet || null,
          balance: Number(w.balance || 0),
          transactions: Array.isArray(w.transactions) ? w.transactions : []
        })),
        activeWalletId: x.activeWalletId || 1
      };
    } catch { 
      return def(); 
    } 
  }
  
  function saveState(s){ localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); }
  
  function getActiveWallet(s){ return s.wallets.find(w => w.id === s.activeWalletId) || s.wallets[0]; }
  
  function setActiveWallet(s, id){ s.activeWalletId = id; saveState(s); }
  
  function renameWallet(s, id, newName){ 
    const wallet = s.wallets.find(w => w.id === id);
    if (wallet && newName && newName.trim()) {
      wallet.name = newName.trim();
      saveState(s);
    }
  }
  
  function createWallet(s){ 
    const active = getActiveWallet(s);
    if (!active.wallet) { 
      active.wallet = {address: makeAddress(), privateKey: makePrivateKey()}; 
      saveState(s);
    } 
    return active.wallet; 
  }
  
  function addTx(s, tx){ 
    const active = getActiveWallet(s);
    active.transactions.unshift(tx); 
    saveState(s); 
  }
  
  function receiveFunds(s, amount=100){ 
    createWallet(s); 
    const active = getActiveWallet(s);
    active.balance = Number((active.balance + amount).toFixed(2)); 
    const tx = {
      id: makeTxId(),
      timestamp: nowIso(),
      type: 'receive',
      amount,
      from: 'faucet',
      to: active.wallet.address,
      status: 'confirmed (simulated)'
    }; 
    addTx(s, tx); 
    return tx; 
  }
  
  function sendFunds(s, to, amount){ 
    createWallet(s); 
    const active = getActiveWallet(s);
    if (!isValidAddress(to)) throw new Error('Invalid recipient address format.'); 
    if (!Number.isFinite(amount) || amount <= 0) throw new Error('Amount must be greater than 0.'); 
    if (amount > active.balance) throw new Error('Insufficient balance.'); 
    active.balance = Number((active.balance - amount).toFixed(2)); 
    const txId = makeTxId();
    const timestamp = nowIso();
    const tx = {
      id: txId,
      timestamp,
      type: 'send',
      amount,
      from: active.wallet.address,
      to,
      status: 'confirmed (simulated)'
    }; 
    addTx(s, tx);

    // Credit the recipient if the address belongs to another wallet in this simulator
    const recipient = s.wallets.find(w => w.wallet && w.wallet.address === to && w.id !== active.id);
    if (recipient) {
      recipient.balance = Number((recipient.balance + amount).toFixed(2));
      recipient.transactions.unshift({
        id: txId,
        timestamp,
        type: 'receive',
        amount,
        from: active.wallet.address,
        to,
        status: 'confirmed (simulated)'
      });
      saveState(s);
    }

    return tx; 
  }
  
  function resetState(){ 
    localStorage.removeItem(STORAGE_KEY); 
    return def(); 
  }

  window.WalletSim = { 
    loadState, 
    saveState, 
    getActiveWallet,
    setActiveWallet,
    renameWallet,
    createWallet, 
    receiveFunds, 
    sendFunds, 
    resetState, 
    isValidAddress 
  };
})();
