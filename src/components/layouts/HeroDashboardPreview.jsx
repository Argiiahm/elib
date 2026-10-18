import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Search,
  ShoppingBag,
  RotateCcw,
  Book,
  Hash,
  History,
  LayoutGridCircles,
  LogOut,
  Trash,
  ArrowRight,
} from 'lucide-react';

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const sidebarMenus = [
  { icon: LayoutGridCircles, label: 'Dashboard', section: null },
  { icon: Book, label: 'Books', section: 'Books' },
  { icon: Hash, label: 'Categories', section: 'Books' },
  { icon: Book, label: 'My Books', section: 'Book Management' },
  { icon: History, label: 'History', section: 'Book Management' },
];

const staggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const slideUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
};

const fadeScale = {
  hidden: { opacity: 0, scale: 0.92 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 350, damping: 22 },
  },
};

const isFirstInSection = (index) => {
  if (!sidebarMenus[index].section) return false;
  if (index === 0) return true;
  return sidebarMenus[index].section !== sidebarMenus[index - 1].section;
};

const MiniSidebar = ({ activeMenu }) => (
    <div className="flex w-[200px] shrink-0 flex-col border-r border-l border-gray-200 bg-white">
      <div className="border-b border-gray-100 px-5 py-4">
        <p className="text-base font-semibold text-gray-800">E - Library</p>
      </div>
      <div className="flex flex-col items-center border-b border-gray-200 py-5">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 18, delay: 0.1 }}
          className="h-14 w-14 overflow-hidden rounded-full bg-orange-500"
        >
          <img src="https://api.dicebear.com/10.x/lorelei/svg?seed=Argiiahm" alt="avatar" className="h-full w-full object-cover pt-1" />
        </motion.div>
        <motion.span
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-2 text-sm font-medium text-gray-700"
        >
          @Argiiahm
        </motion.span>
      </div>
      <motion.div
        className="flex-1 py-3"
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        {sidebarMenus.map((m, i) => {
          const Icon = m.icon;
          const isActive = m.label === activeMenu;
          const showSection = isFirstInSection(i);
          return (
            <motion.div key={m.label} variants={slideUp}>
              {showSection && <p className="px-5 pb-1 pt-3 text-[10px] font-medium uppercase tracking-wide text-slate-400">{m.section}</p>}
              <div
                data-marker={`sidebar-${m.label}`}
                className={`relative flex items-center gap-2.5 px-9 py-2.5 text-sm ${isActive ? 'font-medium text-orange-500' : 'text-gray-500'}`}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebarIndicator"
                    className="absolute left-5 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-orange-500"
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  />
                )}
                <Icon size={16} />
                <span>{m.label}</span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
      <div className="border-t border-gray-100 px-5 py-4">
        <div className="flex items-center gap-2.5 text-sm text-gray-400">
          <LogOut size={16} /><span>Sign out</span>
        </div>
      </div>
    </div>
);

const BrowseScreen = () => (
  <div className="flex h-full border-r border-gray-200">
    <MiniSidebar activeMenu="Books" />
    <motion.div
      className="flex-1 p-8"
      variants={staggerContainer}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={slideUp}>
        <p className="text-xl font-medium text-gray-800">Explore Your <span className="font-bold text-orange-500">Books</span></p>
        <p className="mt-1 text-sm text-gray-500">Every book has a story to tell, and we&apos;re here to help you find the ones that match your interests.</p>
      </motion.div>
      <motion.div variants={slideUp} className="mt-5 flex items-center gap-2 rounded-full border border-gray-200 px-5 py-2.5">
        <Search size={16} className="text-gray-400" />
        <span className="flex-1 text-sm text-gray-300">Search title, author, and more.</span>
        <div data-marker="searchBtn" className="flex items-center gap-2 rounded-full bg-orange-500 px-4 py-1.5 text-xs font-medium text-white">
          <Search size={12} /><span>Search</span>
        </div>
      </motion.div>
      <motion.div variants={slideUp} className="mt-3 flex items-center gap-4">
        {['Fiction', 'Science', 'History', 'Romance'].map((c) => (
          <span key={c} className="flex items-center gap-1 text-sm text-gray-500"><Hash size={14} />{c}</span>
        ))}
        <span className="text-sm font-medium text-gray-800">See All</span>
      </motion.div>
      <div className="mt-6 flex gap-4">
        {[
          { title: 'The Great G...', author: 'F. Scott Fitzgerald', synopsis: 'A story of the fabulously wealthy Jay Ga...' },
          { title: '1984', author: 'George Orwell', synopsis: 'A dystopian social science fiction novel...' },
          { title: 'To Kill a M...', author: 'Harper Lee', synopsis: 'The unforgettable novel of a childhood i...' },
        ].map((book, i) => (
          <motion.div
            key={book.title}
            variants={fadeScale}
            data-marker={i === 0 ? 'firstBook' : undefined}
            className="w-[160px] rounded-md border border-gray-100 p-4"
          >
            <div className="flex h-[120px] w-full items-center justify-center">
              <BookOpen size={40} className="text-gray-300" strokeWidth={1.2} />
            </div>
            <div className="mt-2">
              <p className="text-sm font-medium text-gray-800">{book.title}</p>
              <p className="text-xs text-gray-400">{book.author}</p>
              <p className="mt-1 text-[11px] font-semibold text-gray-500">{book.synopsis}</p>
            </div>
            <div className="mt-2 flex items-center gap-1 text-xs text-gray-600">
              <ArrowRight size={12} /><span>To Details</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </div>
);

const BorrowScreen = () => (
  <div className="flex h-full border-r border-gray-200">
    <MiniSidebar activeMenu="Books" />
    <motion.div
      className="flex-1 p-8"
      variants={staggerContainer}
      initial="hidden"
      animate="show"
    >
      <div className="flex gap-6">
        <motion.div variants={fadeScale} className="flex h-[200px] w-[160px] shrink-0 items-center justify-center rounded border border-gray-100">
          <BookOpen size={48} className="text-gray-300" strokeWidth={1.2} />
        </motion.div>
        <div className="flex-1">
          <motion.div variants={slideUp}>
            <p data-marker="bookTitle" className="text-2xl font-bold text-gray-800">The Great Gatsby</p>
            <div className="mt-1 flex items-center gap-3">
              <span className="flex items-center gap-1 text-sm text-gray-500"><Hash size={14} />Fiction</span>
              <p className="text-sm text-gray-500">Written by <span className="font-semibold text-orange-500 underline">F. Scott Fitzgerald</span></p>
            </div>
          </motion.div>
          <motion.div variants={slideUp} className="mt-5">
            <p data-marker="synopsisLabel" className="text-base font-semibold text-gray-800">Synopsis</p>
            <p className="mt-1 text-sm leading-relaxed text-gray-500">A story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan, of lavish parties on Long Island at a time when The New York Times noted &quot;gin was the national drink.&quot;</p>
          </motion.div>
          <motion.div variants={slideUp}>
            <div data-marker="borrowBtn" className="mt-6 flex w-fit items-center gap-2 rounded-lg bg-zinc-900 px-8 py-3 text-sm font-medium text-white">
              <ShoppingBag size={18} /><span>Borrow Book</span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  </div>
);

const MyBorrowsScreen = () => (
  <div className="flex h-full border-r border-gray-200">
    <MiniSidebar activeMenu="My Books" />
    <motion.div
      className="flex-1"
      variants={staggerContainer}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={slideUp} className="border-b border-gray-200 px-6 py-5">
        <p data-marker="borrowsTitle" className="text-lg font-bold text-gray-800">Your Borrows Table</p>
        <p className="mt-1 text-sm text-gray-500">Manage and view your recent borrows.</p>
      </motion.div>
      <table className="w-full text-sm">
        <motion.thead variants={slideUp} className="bg-slate-100 text-xs uppercase tracking-wider text-gray-600">
          <tr>
            <th className="px-4 py-3.5 text-left">Borrow ID</th>
            <th className="px-4 py-3.5 text-left">Book</th>
            <th className="px-4 py-3.5 text-left">Borrow Date</th>
            <th className="px-4 py-3.5 text-left">Status</th>
            <th className="px-4 py-3.5 text-left">Action</th>
          </tr>
        </motion.thead>
        <tbody className="divide-y divide-gray-200">
          <motion.tr variants={slideUp} className="hover:bg-gray-50">
            <td className="px-4 py-4"><p className="whitespace-nowrap font-semibold">09051aef-f05f...</p><p className="mt-0.5 text-xs text-gray-400">Loan Date · 10/18/2026</p></td>
            <td className="px-4 py-4"><p className="font-semibold">The Great Gatsby</p><p className="text-xs text-gray-400">BOOK001</p></td>
            <td className="px-4 py-4 font-semibold">10/18/2026</td>
            <td className="px-4 py-4"><span className="font-bold text-orange-500">pending</span></td>
            <td className="px-4 py-4"><span data-marker="cancelBtn" className="inline-flex items-center gap-2 rounded-md bg-red-500 px-5 py-2 text-xs font-medium text-white"><Trash size={12} />Cancel</span></td>
          </motion.tr>
          <motion.tr variants={slideUp} className="hover:bg-gray-50">
            <td className="px-4 py-4"><p className="whitespace-nowrap font-semibold">a3b2c1d0-e4f5...</p><p className="mt-0.5 text-xs text-gray-400">Loan Date · 10/15/2026</p></td>
            <td className="px-4 py-4"><p className="font-semibold">1984</p><p className="text-xs text-gray-400">BOOK002</p></td>
            <td className="px-4 py-4 font-semibold">10/15/2026</td>
            <td className="px-4 py-4"><span className="font-bold text-green-500">accepted</span></td>
            <td className="px-4 py-4"><span data-marker="returnBtn" className="inline-flex items-center gap-2 rounded-md bg-orange-500 px-5 py-2 text-xs font-medium text-white"><RotateCcw size={12} />Return</span></td>
          </motion.tr>
        </tbody>
      </table>
      <motion.div variants={slideUp} className="border-t border-gray-200 px-6 py-3 text-xs text-gray-500">Showing 2 orders</motion.div>
    </motion.div>
  </div>
);

const ReturnScreen = () => (
  <div className="flex h-full border-r border-gray-200">
    <MiniSidebar activeMenu="My Books" />
    <motion.div
      className="flex-1"
      variants={staggerContainer}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={slideUp} className="border-b border-gray-200 px-6 py-5">
        <p className="text-lg font-bold text-gray-800">Your Borrows Table</p>
        <p className="mt-1 text-sm text-gray-500">Manage and view your recent borrows.</p>
      </motion.div>
      <table className="w-full text-sm">
        <motion.thead variants={slideUp} className="bg-slate-100 text-xs uppercase tracking-wider text-gray-600">
          <tr>
            <th className="px-4 py-3.5 text-left">Borrow ID</th>
            <th className="px-4 py-3.5 text-left">Book</th>
            <th className="px-4 py-3.5 text-left">Borrow Date</th>
            <th className="px-4 py-3.5 text-left">Status</th>
            <th className="px-4 py-3.5 text-left">Action</th>
          </tr>
        </motion.thead>
        <tbody className="divide-y divide-gray-200">
          <motion.tr variants={slideUp} className="hover:bg-gray-50">
            <td className="px-4 py-4"><p className="whitespace-nowrap font-semibold">a3b2c1d0-e4f5...</p><p className="mt-0.5 text-xs text-gray-400">Loan Date · 10/15/2026</p></td>
            <td className="px-4 py-4"><p className="font-semibold">1984</p><p className="text-xs text-gray-400">BOOK002</p></td>
            <td className="px-4 py-4 font-semibold">10/15/2026</td>
            <td className="px-4 py-4"><span className="font-bold text-green-500">accepted</span></td>
            <td className="px-4 py-4"><span data-marker="waitingBadge" className="inline-flex items-center gap-2 rounded-md bg-gray-100 px-5 py-2 text-xs font-medium text-gray-500"><RotateCcw size={12} />Waiting Confirmation</span></td>
          </motion.tr>
        </tbody>
      </table>
      <motion.div
        variants={fadeScale}
        data-marker="successCard"
        className="mx-6 mt-4 rounded-lg border border-green-200 bg-green-50 p-5"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-700">Return Submitted!</p>
            <p className="text-xs text-gray-400">Waiting for admin confirmation</p>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100">
            <RotateCcw size={16} className="text-green-600" />
          </div>
        </div>
        <div className="mt-3 flex justify-between text-sm">
          <span className="text-gray-400">Fine Amount</span>
          <span className="font-bold text-green-600">Rp 0</span>
        </div>
        <div className="mt-1 flex justify-between text-sm">
          <span className="text-gray-400">Status</span>
          <span data-marker="onTimeLabel" className="font-bold text-green-600">On Time</span>
        </div>
      </motion.div>
    </motion.div>
  </div>
);

const screenComponents = [BrowseScreen, BorrowScreen, MyBorrowsScreen, ReturnScreen];

const stepScript = [
  [['searchBtn', true], ['firstBook', true]],
  [['bookTitle', false], ['synopsisLabel', false], ['borrowBtn', true]],
  [['sidebar-My Books', true], ['cancelBtn', true], ['returnBtn', true]],
  [['waitingBadge', false], ['successCard', false], ['onTimeLabel', false]],
];

const screenTransition = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -60 },
  transition: { type: 'spring', stiffness: 260, damping: 26 },
};

const FakeCursor = ({ pos, clicking }) => (
  <motion.div
    className="pointer-events-none absolute z-50"
    animate={{ left: pos.x, top: pos.y }}
    transition={{ type: 'spring', stiffness: 170, damping: 20, mass: 0.6 }}
  >
    <motion.svg
      width="24"
      height="28"
      viewBox="0 0 20 24"
      fill="none"
      animate={{ scale: clicking ? 0.7 : 1 }}
      transition={{ type: 'spring', stiffness: 500, damping: 15 }}
    >
      <path d="M2 2L2 18L6.5 13.5L10.5 21L13.5 19.5L9.5 12L15 11L2 2Z" fill="black" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
    </motion.svg>
    <AnimatePresence>
      {clicking && (
        <motion.div
          className="absolute rounded-full border-2 border-orange-400"
          style={{ left: -6, top: -6 }}
          initial={{ width: 8, height: 8, opacity: 0.9 }}
          animate={{ width: 36, height: 36, opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        />
      )}
    </AnimatePresence>
  </motion.div>
);

const HeroDashboardPreview = () => {
  const [active, setActive] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: -50, y: -50 });
  const [clicking, setClicking] = useState(false);
  const [showCursor, setShowCursor] = useState(false);
  const containerRef = useRef(null);

  const moveTo = useCallback((name) => {
    const container = containerRef.current;
    if (!container) return false;
    const el = container.querySelector(`[data-marker="${name}"]`);
    if (!el) return false;

    const eR = el.getBoundingClientRect();
    const cR = container.getBoundingClientRect();

    setCursorPos({
      x: eR.left - cR.left + eR.width / 2,
      y: eR.top - cR.top + eR.height / 2,
    });
    return true;
  }, []);

  useEffect(() => {
    let dead = false;

    const run = async () => {
      setClicking(false);
      setShowCursor(false);
      setCursorPos({ x: -50, y: -50 });

      await wait(500);
      if (dead) return;

      setShowCursor(true);

      const script = stepScript[active];

      for (const [markerName, shouldClick] of script) {
        if (dead) return;

        const ok = moveTo(markerName);
        if (!ok) {
          await wait(100);
          continue;
        }

        await wait(600);
        if (dead) return;

        if (shouldClick) {
          setClicking(true);
          await wait(120);
          if (dead) return;
          setClicking(false);
          await wait(300);
          if (dead) return;
        } else {
          await wait(400);
          if (dead) return;
        }
      }

      await wait(500);
      if (dead) return;

      setShowCursor(false);
      setActive((p) => (p + 1) % screenComponents.length);
    };

    run();
    return () => { dead = true; };
  }, [active, moveTo]);

  const Screen = screenComponents[active];

  return (
    <div className="mx-auto w-full max-w-7xl px-4">
      <div className="mx-auto overflow-hidden bg-white" style={{ maxWidth: 1060 }}>
        <div ref={containerRef} className="relative overflow-hidden" style={{ height: 540 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="absolute inset-0"
              {...screenTransition}
            >
              <Screen />
            </motion.div>
          </AnimatePresence>
          <AnimatePresence>
            {showCursor && <FakeCursor pos={cursorPos} clicking={clicking} />}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default HeroDashboardPreview;
