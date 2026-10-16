import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  X, 
  Send, 
  ArrowRight, 
  RotateCcw,
  Bot,
  Flame,
  Award,
  Gift,
  HelpCircle,
  ShieldCheck,
  Maximize2,
  Minimize2,
  CheckCircle2,
  ShoppingBag
} from 'lucide-react';
import { products } from '../../data/products';
import { useCart } from '../../context/CartContext';

const SUGGESTED_QUESTIONS = [
  {
    iconType: 'flame',
    text: 'Best pickle for daily parathas & dal?',
    reply: 'Our #1 bestseller is the **Classic Ramkela Mango Pickle**! Prepared with raw mangoes, sendha namak, and pure cold-pressed mustard oil, it offers the perfect authentic Rajasthani taste.',
    target: 'product-detail',
    targetParams: { productId: 'aam-classic' },
    targetLabel: 'View Classic Mango'
  },
  {
    iconType: 'sparkles',
    text: 'Which pickle is best for digestion?',
    reply: 'Go for our **Traditional Sweet & Tangy Lemon Pickle**! Made with thin-skinned Kagzi lemons and sun-cured with digestive ajwain, rock salt, and roasted cumin. It has zero oil and is soothing for daily digestion.',
    target: 'product-detail',
    targetParams: { productId: 'nimbu-khatta-meetha' },
    targetLabel: 'View Lemon Pickle'
  },
  {
    iconType: 'award',
    text: 'Show me something fiery & bold!',
    reply: 'You will love our famous **Stuffed Banarasi Red Chilli Pickle (Bharwa Lal Mirch)**! Plump red chillies packed with tangy dry amchur, yellow mustard seeds, and stone-ground spices.',
    target: 'product-detail',
    targetParams: { productId: 'lal-mirch-bharwa' },
    targetLabel: 'View Red Chilli Pickle'
  },
  {
    iconType: 'gift',
    text: 'Recommend a gift hamper / combo box',
    reply: 'Our **Craft Your Custom Combo Box** lets you pick any 2, 3, or 4 of our freshest handcrafted pickle jars in a heritage crate with a personalized message note!',
    target: 'combo-builder',
    targetParams: {},
    targetLabel: 'Build Custom Combo'
  },
  {
    iconType: 'shield',
    text: 'Is your pickle 100% preservative-free?',
    reply: 'Yes! We use strictly zero synthetic vinegar (acetic acid) and zero artificial chemical preservatives (like sodium benzoate). Only natural Rajasthani sun-curing, cold-pressed mustard oil, and sendha namak preserve our pickles for 12+ months.',
    target: 'our-story',
    targetParams: {},
    targetLabel: 'Read Our Story'
  }
];

export const AiAssistantWidget = ({ onNavigate }) => {
  const { isCartOpen } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'ai',
      text: "Namaste! 🙏 I am your **Marusthali Taste AI** assistant. Ask me anything about spice levels, healthy oil, food pairings, or personalized pickle recommendations!",
      timestamp: 'Just now'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const chatBottomRef = useRef(null);

  // Auto-scroll on new message
  useEffect(() => {
    if (isOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  // If cart opens, auto-close the AI popover
  useEffect(() => {
    if (isCartOpen && isOpen) {
      setIsOpen(false);
    }
  }, [isCartOpen, isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
    setHasUnread(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSend = (textToSend = null) => {
    const text = (textToSend || inputValue).trim();
    if (!text) return;

    const userMessageId = `user-${Date.now()}`;
    const userMsg = {
      id: userMessageId,
      sender: 'user',
      text,
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    // Contextual Pickle Sommelier AI Logic
    setTimeout(() => {
      let replyText = "Our pickles are 100% handcrafted in Sikar, Rajasthan using pure cold-pressed mustard oil, sendha namak, and sun-cooking in ceramic jars!";
      let action = null;

      const lower = text.toLowerCase();
      if (lower.includes('mango') || lower.includes('aam') || lower.includes('kairi')) {
        replyText = "For mango lovers, we have 4 authentic varieties: **Classic Mango**, **Crisp Green Kairi**, **Punjabi Dhaba Mango**, and **Royal Marwari Mango**! Sun-cooked to perfection.";
        action = { target: 'category', targetParams: { categoryId: 'mango' }, label: 'Explore Mango Pickles' };
      } else if (lower.includes('lemon') || lower.includes('nimbu') || lower.includes('digest') || lower.includes('pet') || lower.includes('acidity')) {
        replyText = "Our **Kagzi Lemon Pickle (Nimbu Ka Achar)** is 100% oil-free, sun-cooked with digestive ajwain, roasted jeera, and rock salt. Excellent for digestion after everyday meals!";
        action = { target: 'product-detail', targetParams: { productId: 'nimbu-khatta-meetha' }, label: 'View Lemon Pickle' };
      } else if (lower.includes('chilli') || lower.includes('mirch') || lower.includes('spicy') || lower.includes('hot') || lower.includes('teekha')) {
        replyText = "Craving authentic spice? Try our **Stuffed Banarasi Red Chilli** or **Tangy Chatpata Mango**! Packed with whole spices and cold-pressed mustard oil.";
        action = { target: 'category', targetParams: { categoryId: 'mirchi' }, label: 'View Chilli Pickles' };
      } else if (lower.includes('garlic') || lower.includes('lahsun') || lower.includes('lasun')) {
        replyText = "Our **Desi Lahsun Ka Achar** is made with unpeeled small desi garlic cloves soaked in yellow mustard and cold-pressed oil—great for immunity and rich flavor!";
        action = { target: 'category', targetParams: { categoryId: 'garlic' }, label: 'View Garlic Pickle' };
      } else if (lower.includes('jain') || lower.includes('no onion') || lower.includes('satvik')) {
        replyText = "We have dedicated **Jain-Satvik Pickles** prepared without onion, garlic, or root vegetables in pure separate ceramic vessels!";
        action = { target: 'category', targetParams: { categoryId: 'jain' }, label: 'View Jain Pickles' };
      } else if (lower.includes('gift') || lower.includes('combo') || lower.includes('box') || lower.includes('hamper') || lower.includes('pack')) {
        replyText = "Check out our **Craft Your Custom Combo Box**! You can handpick any 2, 3, or 4 jars with complimentary gift packaging and an optional personal greeting note.";
        action = { target: 'combo-builder', targetParams: {}, label: 'Open Custom Box Studio' };
      } else if (lower.includes('oil') || lower.includes('preservative') || lower.includes('pure') || lower.includes('natural') || lower.includes('chemical')) {
        replyText = "We use **100% pure cold-pressed kachi ghani mustard oil** and natural solar fermentation over 21 days. Absolutely zero artificial preservatives, synthetic vinegar, or food coloring!";
        action = { target: 'our-story', targetParams: {}, label: 'How We Make It' };
      } else if (lower.includes('ship') || lower.includes('delivery') || lower.includes('track') || lower.includes('order')) {
        replyText = "We ship to over 28,000+ pin codes across India with 5-ply shockproof honeycomb cushioning for zero breakage. Delivery usually takes 3–5 days!";
        action = { target: 'account', targetParams: { tab: 'orders' }, label: 'Track Your Order' };
      } else if (lower.includes('price') || lower.includes('rate') || lower.includes('cost') || lower.includes('offer')) {
        replyText = "Our single jars start at ₹199 (250g) and ₹279 (500g). Plus, get **FREE Pan-India Shipping** on orders above ₹499 and extra discounts on our Combo Boxes!";
        action = { target: 'all-products', targetParams: {}, label: 'Browse All Prices' };
      }

      setMessages(prev => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: replyText,
          action,
          timestamp: 'Just now'
        }
      ]);
      setIsTyping(false);
    }, 550);
  };

  const handleSuggestedClick = (item) => {
    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: item.text,
      timestamp: 'Just now'
    };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: item.reply,
          action: {
            target: item.target,
            targetParams: item.targetParams,
            label: item.targetLabel
          },
          timestamp: 'Just now'
        }
      ]);
      setIsTyping(false);
    }, 450);
  };

  const handleActionClick = (action) => {
    if (onNavigate && action?.target) {
      onNavigate(action.target, action.targetParams || {});
      setIsOpen(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome',
        sender: 'ai',
        text: "Namaste! 🙏 Chat has been reset. How can I help you choose the finest artisanal pickle today?",
        timestamp: 'Just now'
      }
    ]);
  };

  const renderSuggestedIcon = (type) => {
    switch (type) {
      case 'flame': return <Flame className="w-3.5 h-3.5 text-amber-500 shrink-0" />;
      case 'sparkles': return <Sparkles className="w-3.5 h-3.5 text-yellow-500 shrink-0" />;
      case 'award': return <Award className="w-3.5 h-3.5 text-rose-500 shrink-0" />;
      case 'gift': return <Gift className="w-3.5 h-3.5 text-emerald-500 shrink-0" />;
      case 'shield': return <ShieldCheck className="w-3.5 h-3.5 text-blue-500 shrink-0" />;
      default: return <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />;
    }
  };

  return (
    <>
      {/* ================= FLOATING ACTION BUTTON (HIGH CONTRAST & ACCESSIBLE) ================= */}
      <div 
        className={`fixed bottom-20 lg:bottom-6 right-4 sm:right-6 z-40 flex items-center gap-3 transition-all duration-300 ${
          isCartOpen 
            ? 'opacity-0 pointer-events-none scale-75 translate-y-6 invisible' 
            : 'opacity-100 scale-100 translate-y-0 visible'
        }`}
      >
        
        {/* Subtle Greeting Pill (Visible when closed) */}
        {!isOpen && hasUnread && (
          <button
            onClick={handleOpen}
            className="hidden sm:flex items-center gap-2 bg-[#2D1810] text-[#FBBF24] border border-[#C88214] px-4 py-2.5 rounded-full text-xs font-black shadow-2xl hover:scale-105 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]/50" />
            <span>Taste AI Guide</span>
          </button>
        )}

        {/* Increased Size Floating Trigger Button */}
        <button
          onClick={() => (isOpen ? handleClose() : handleOpen())}
          className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#1C120C] via-[#351E12] to-[#602D0E] text-[#FBBF24] flex items-center justify-center shadow-2xl border-2 border-[#C88214] hover:scale-110 active:scale-95 transition-all cursor-pointer group"
          aria-label="Toggle AI Pickle Assistant"
          title="Marusthali Taste AI"
        >
          {isOpen ? (
            <X className="w-7 h-7 text-white" />
          ) : (
            <div className="relative flex items-center justify-center">
              <Bot className="w-7 h-7 text-[#FBBF24] group-hover:scale-110 transition-transform" />
              {/* Pulsing online badge */}
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-[#1C120C]" />
              </span>
            </div>
          )}
        </button>
      </div>

      {/* ================= FULL / EXPANDED AI CHAT POPOVER ================= */}
      {isOpen && !isCartOpen && (
        <>
          {/* Mobile Backdrop Overlay for clarity */}
          <div 
            onClick={handleClose}
            className="sm:hidden fixed inset-0 bg-black/50 z-50 backdrop-blur-xs transition-opacity"
          />

          <div 
            className={`fixed z-50 transition-all duration-300 flex flex-col overflow-hidden shadow-2xl border-2 border-[#C88214]/50 bg-white
              ${/* On Mobile: Take large 88vh height and full width, clean card look */
                'bottom-0 left-0 right-0 sm:left-auto sm:right-6 sm:bottom-24 w-full sm:w-[450px] md:w-[480px] rounded-t-3xl sm:rounded-3xl'
              }
              ${isExpanded 
                ? 'h-[92vh] sm:h-[680px] sm:w-[580px]' 
                : 'h-[85vh] sm:h-[580px] max-h-[88vh] sm:max-h-[620px]'
              }
            `}
          >
            
            {/* Header (Rich Heritage Warm Dark & Gold) */}
            <div className="bg-[#1C120C] text-white p-4 flex items-center justify-between border-b border-[#3D281C] shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#C88214]/20 border border-[#C88214]/50 flex items-center justify-center text-[#FBBF24] shadow-xs">
                  <Bot className="w-6 h-6 text-[#FBBF24]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif font-black text-base text-[#FFFDF9]">
                      Marusthali Taste AI
                    </h3>
                    <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded-full font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                      Active
                    </span>
                  </div>
                  <p className="text-[11px] text-[#D4B996] font-medium">
                    Artisanal Pickle Sommelier & Pairings
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {/* Reset Chat */}
                <button
                  onClick={handleResetChat}
                  className="p-1.5 rounded-xl text-[#C2B29F] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  title="Reset Chat"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                {/* Expand Toggle on desktop */}
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="hidden sm:inline-flex p-1.5 rounded-xl text-[#C2B29F] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  title={isExpanded ? 'Collapse' : 'Expand'}
                >
                  {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>

                {/* Close Button */}
                <button
                  onClick={handleClose}
                  className="p-1.5 rounded-xl text-[#C2B29F] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close Assistant"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Conversation Messages Scroll Area */}
            <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-3.5 bg-[#FAF6EE] text-sm">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl p-3.5 shadow-xs leading-relaxed text-xs sm:text-sm ${
                      msg.sender === 'user'
                        ? 'bg-[#2D1810] text-[#FFFDF9] rounded-br-xs'
                        : 'bg-white text-[#2D1810] border border-[#E8DDCD] rounded-bl-xs'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.text}</p>

                    {/* Navigation Action Button */}
                    {msg.action && (
                      <button
                        onClick={() => handleActionClick(msg.action)}
                        className="mt-3 inline-flex items-center gap-1.5 bg-[#E69500] hover:bg-[#D48600] text-[#1C120C] font-extrabold text-xs px-3.5 py-1.5 rounded-full shadow-xs cursor-pointer transition-all hover:scale-102"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>{msg.action.label}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <span className="text-[10px] text-gray-400 mt-1 px-1 font-mono">
                    {msg.timestamp}
                  </span>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex items-center gap-1.5 bg-white border border-[#E8DDCD] rounded-2xl px-3.5 py-2 text-gray-500 w-fit">
                  <span className="w-2 h-2 rounded-full bg-[#E69500] animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-[#E69500] animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 rounded-full bg-[#E69500] animate-bounce [animation-delay:0.4s]" />
                  <span className="text-xs font-semibold text-gray-500 ml-1.5">Checking recipe notes...</span>
                </div>
              )}

              <div ref={chatBottomRef} />
            </div>

            {/* Suggested Quick Questions */}
            <div className="p-2.5 bg-white border-t border-[#EFE8DD] flex gap-2 overflow-x-auto no-scrollbar shrink-0">
              {SUGGESTED_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSuggestedClick(q)}
                  className="shrink-0 bg-[#FAF6EE] hover:bg-amber-100/70 text-[#2D1810] border border-[#E8DDCD] rounded-full px-3 py-1.5 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {renderSuggestedIcon(q.iconType)}
                  <span className="truncate max-w-[170px] sm:max-w-[210px]">{q.text}</span>
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3.5 bg-white border-t border-[#E8DDCD] flex items-center gap-2.5 shrink-0"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about spices, oils, flavours, pairing..."
                className="flex-1 bg-[#FAF6EE] border border-[#E8DDCD] rounded-full px-4 py-2.5 text-xs sm:text-sm text-[#2D1810] placeholder-gray-400 focus:outline-none focus:border-[#C88214] font-medium"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="w-10 h-10 rounded-full bg-[#2D1810] hover:bg-[#432314] text-[#FBBF24] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-all cursor-pointer shrink-0 shadow-md"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </div>
        </>
      )}
    </>
  );
};

export default AiAssistantWidget;
