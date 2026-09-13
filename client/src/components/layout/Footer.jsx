import { Link } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import settingsApi from '../../api/settings.api';
import logo from '../../assets/loscale-logo.png';
import { YoutubeIcon, LinkedinIcon, TwitterIcon, InstagramIcon } from '../ui/SocialIcons';

const socialLinkConfig = [
  { key: 'youtube', label: 'YouTube', Icon: YoutubeIcon },
  { key: 'linkedin', label: 'LinkedIn', Icon: LinkedinIcon },
  { key: 'twitter', label: 'Twitter / X', Icon: TwitterIcon },
  { key: 'instagram', label: 'Instagram', Icon: InstagramIcon },
];

export default function Footer() {
  const { data: settings } = useFetch(() => settingsApi.getPublic(), []);
  const social = settings?.social || {};
  const activeSocialLinks = socialLinkConfig.filter((s) => social[s.key]);

  return (
    <footer className="mx-auto max-w-6xl px-6 pb-16 pt-24 md:px-10">
      <div className="grid gap-16 md:grid-cols-2">
        <div className="space-y-8">
          <img src={logo} alt="Loscale" className="h-9 w-auto" style={{ filter: 'invert(1)' }} />
          <p className="max-w-sm text-black/60">
            LO SCALE is a full-service digital growth agency dedicated to turning online visibility into
            measurable revenue.
          </p>

          {activeSocialLinks.length > 0 && (
            <div className="flex gap-3">
              {activeSocialLinks.map(({ key, label, Icon }) => (
                <a
                  key={key}
                  href={social[key]}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f5f5f5] text-black transition-colors hover:bg-black hover:text-white"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          <div className="space-y-4">
            <p className="font-semibold text-black">Company</p>
            <ul className="space-y-3 text-sm text-black/60">
              <li>
                <Link to="/" className="hover:text-black">
                  Who We Are
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-black">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/works" className="hover:text-black">
                  Our Work
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <p className="font-semibold text-black">Services</p>
            <ul className="space-y-3 text-sm text-black/60">
              <li>
                <Link to="/services" className="hover:text-black">
                  All Services
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-black">
                  Get a Proposal
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <p className="font-semibold text-black">Legal</p>
            <ul className="space-y-3 text-sm text-black/60">
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
              <li>Cookie Policy</li>
            </ul>
          </div>
        </div>
      </div>

      <p className="mt-16 text-xs text-black/40">
        &copy; {new Date().getFullYear()} Loscale. All rights reserved.
      </p>
    </footer>
  );
}
