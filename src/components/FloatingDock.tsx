import { useRef, useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
  type MotionValue,
} from "framer-motion";
import {
  Home,
  User,
  Briefcase,
  FolderGit2,
  Code2,
  GraduationCap,
  Mail,
  type LucideIcon,
} from "lucide-react";

interface NavItem {
  label: string;
  sectionId: string;
  icon: LucideIcon;
}

const navItems: NavItem[] = [
  { label: "Home", sectionId: "hero", icon: Home },
  { label: "About", sectionId: "about", icon: User },
  { label: "Experience", sectionId: "experience", icon: Briefcase },
  { label: "Projects", sectionId: "projects", icon: FolderGit2 },
  { label: "Skills", sectionId: "skills", icon: Code2 },
  { label: "Education", sectionId: "education", icon: GraduationCap },
  { label: "Contact", sectionId: "contact", icon: Mail },
];

function DockItem({
  item,
  mouseX,
  isActive,
  onClick,
}: {
  item: NavItem;
  mouseX: MotionValue<number>;
  isActive: boolean;
  onClick: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const distance = useTransform(mouseX, (val: number) => {
    const el = ref.current;
    if (!el) return 150;
    const rect = el.getBoundingClientRect();
    const center = rect.left + rect.width / 2;
    return Math.abs(val - center);
  });

  const scaleValue = useTransform(distance, [0, 60, 120], [1.4, 1.2, 1]);
  const scale = useSpring(scaleValue, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const Icon = item.icon;

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ scale }}
      className="relative flex flex-col items-center justify-center w-10 h-10 rounded-xl transition-colors duration-200 cursor-pointer"
      aria-label={`Navigate to ${item.label}`}
    >
      {/* Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.span
            initial={{ opacity: 0, y: 4, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className="absolute -top-9 left-1/2 -translate-x-1/2 px-2 py-1 rounded-md text-xs font-medium whitespace-nowrap
              bg-white/[0.08] backdrop-blur-xl border border-white/[0.1] text-fg"
          >
            {item.label}
          </motion.span>
        )}
      </AnimatePresence>

      {/* Icon */}
      <Icon
        size={20}
        className={`transition-colors duration-200 ${
          isActive || isHovered ? "text-fg" : "text-fg-muted"
        }`}
      />

      {/* Active indicator dot */}
      <AnimatePresence>
        {isActive && (
          <motion.span
            layoutId="dock-active-dot"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute -bottom-1 w-1 h-1 rounded-full bg-violet"
          />
        )}
      </AnimatePresence>
    </motion.button>
  );
}

function FloatingDock() {
  const mouseX = useMotionValue(Infinity);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [isVisible, setIsVisible] = useState(false);

  // Track scroll position to show/hide the dock and detect active section
  // Uses rAF throttling to avoid layout thrashing on every scroll event
  useEffect(() => {
    const sectionIds = navItems.map((item) => item.sectionId);
    const sectionElements: (HTMLElement | null)[] = sectionIds.map((id) =>
      document.getElementById(id)
    );

    let ticking = false;

    const updateScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;

      setIsVisible(scrollY > viewportHeight);

      let currentSection = "hero";
      const scrollMid = scrollY + viewportHeight / 2;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i];
        if (el && el.offsetTop <= scrollMid) {
          currentSection = sectionIds[i];
          break;
        }
      }

      setActiveSection(currentSection);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    updateScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-4 sm:bottom-6 left-0 right-0 z-50 flex justify-center pointer-events-none px-4">
          <motion.nav
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            onMouseMove={(e) => mouseX.set(e.clientX)}
            onMouseLeave={() => mouseX.set(Infinity)}
            className="pointer-events-auto flex items-center gap-1
              px-3 py-2 rounded-2xl
              bg-white/[0.04] backdrop-blur-2xl border border-white/[0.08]
              shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            role="navigation"
            aria-label="Section navigation"
          >
            {navItems.map((item) => (
              <DockItem
                key={item.sectionId}
                item={item}
                mouseX={mouseX}
                isActive={activeSection === item.sectionId}
                onClick={() => handleClick(item.sectionId)}
              />
            ))}
          </motion.nav>
        </div>
      )}
    </AnimatePresence>
  );
}

export default FloatingDock;
