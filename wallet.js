(function () {
  const STORAGE_KEY = 'wallet-sim-state-v1';
  const rnd = (n) => Array.from({length:n},()=> 'abcdef0123456789'[Math.floor(Math.random()*16)]).join('');
  const makeAddress = () => `0x${rnd(40)}`;
  const makePrivateKey = () => `0x${rnd(64)}`;
  const makeTxId = () => `0x${rnd(64)}`;
  const isValidAddress = (a) => /^0x[a-fA-F0-9]{40}$/.test(a || '');
  const nowIso = () => new Date().toISOString();
  const def = () => ({ wallet:null, balance:0, transactions:[] });

  function loadState(){ try { const x=JSON.parse(localStorage.getItem(STORAGE_KEY)||'null'); return x?{wallet:x.wallet||null,balance:Number(x.balance||0),transactions:Array.isArray(x.transactions)?x.transactions:[]} : def(); } catch { return def(); } }
  function saveState(s){ localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); }
  function createWallet(s){ if(!s.wallet){ s.wallet={address:makeAddress(), privateKey:makePrivateKey()}; saveState(s);} return s.wallet; }
  function addTx(s,tx){ s.transactions.unshift(tx); saveState(s); }
  function receiveFunds(s, amount=100){ createWallet(s); s.balance=Number((s.balance+amount).toFixed(2)); const tx={id:makeTxId(),timestamp:nowIso(),type:'receive',amount,from:'faucet',to:s.wallet.address,status:'confirmed (simulated)'}; addTx(s,tx); return tx; }
  function sendFunds(s,to,amount){ createWallet(s); if(!isValidAddress(to)) throw new Error('Invalid recipient address format.'); if(!Number.isFinite(amount)||amount<=0) throw new Error('Amount must be greater than 0.'); if(amount>s.balance) throw new Error('Insufficient balance.'); s.balance=Number((s.balance-amount).toFixed(2)); const tx={id:makeTxId(),timestamp:nowIso(),type:'send',amount,from:s.wallet.address,to,status:'confirmed (simulated)'}; addTx(s,tx); return tx; }
  function resetState(){ localStorage.removeItem(STORAGE_KEY); return def(); }

  window.WalletSim = { loadState, saveState, createWallet, receiveFunds, sendFunds, resetState, isValidAddress };
})();
