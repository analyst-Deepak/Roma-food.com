import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { COMPANY_INFO } from '../data/products';

export type LegalTab = 'terms' | 'privacy' | 'cookie';

interface LegalModalProps {
  isOpen: boolean;
  initialTab?: LegalTab;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  initialTab = 'terms',
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<LegalTab>(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab, isOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-white text-gray-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-gray-200"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Top Header with Close 'X' */}
        <div className="relative pt-8 pb-4 px-6 sm:px-12 text-center border-b border-gray-200 bg-white shrink-0">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Centered Brand Logo */}
          <div className="flex justify-center items-center mb-3">
            <img
              src="/assets/romas-logo-brown.png"
              alt="ROMAS Spreading Happiness"
              className="h-10 sm:h-12 w-auto object-contain"
            />
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 mt-4 overflow-x-auto py-1">
            <button
              onClick={() => setActiveTab('terms')}
              className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all ${
                activeTab === 'terms'
                  ? 'bg-[#4A1704] text-white shadow-sm'
                  : 'text-gray-600 hover:text-[#4A1704] hover:bg-gray-100'
              }`}
            >
              Terms & Conditions
            </button>
            <button
              onClick={() => setActiveTab('privacy')}
              className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all ${
                activeTab === 'privacy'
                  ? 'bg-[#4A1704] text-white shadow-sm'
                  : 'text-gray-600 hover:text-[#4A1704] hover:bg-gray-100'
              }`}
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setActiveTab('cookie')}
              className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all ${
                activeTab === 'cookie'
                  ? 'bg-[#4A1704] text-white shadow-sm'
                  : 'text-gray-600 hover:text-[#4A1704] hover:bg-gray-100'
              }`}
            >
              Cookie Policy
            </button>
          </div>
        </div>

        {/* Scrollable Document Body */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-14 py-8 font-serif leading-relaxed text-[13px] sm:text-sm text-gray-800 space-y-6">
          {activeTab === 'terms' && (
            <div>
              <h2 className="text-xl sm:text-2xl font-sans font-bold text-center uppercase tracking-wide text-gray-900 border-b-2 border-gray-900 pb-2 max-w-xs mx-auto mb-8">
                TERMS AND CONDITIONS
              </h2>

              <p className="text-justify font-sans text-xs sm:text-sm text-gray-700 leading-relaxed mb-4">
                This website (https://www.romaschocolates.com/) (<strong>“Website”</strong>) is operated by Roma Foods (<strong>“Company”</strong>, <strong>“we”</strong>, <strong>“us”</strong>, <strong>“our”</strong>). These terms and conditions (<strong>“Terms”</strong>) constitute an electronic record within the meaning of the applicable law and regulates the legal relationship between us and you (<strong>“customer”</strong> or <strong>“you”</strong> or <strong>“your”</strong>).
              </p>

              <p className="text-justify font-sans text-xs sm:text-sm text-gray-700 leading-relaxed mb-4">
                We offer this Website, including all information, tools and services available from this Website to you, conditioned upon your acceptance of all terms, conditions, policies and notices stated here. Please read these Terms carefully. If you do not agree to the terms of this Privacy Policy, please do not access our Website.
              </p>

              <p className="text-justify font-sans text-xs sm:text-sm text-gray-700 leading-relaxed mb-6">
                You are advised to read these Terms along with and in conjunction with our Privacy Policy and the Cookie Policy and other policies on our Website.
              </p>

              {/* Section 1 */}
              <div className="space-y-3 font-sans text-xs sm:text-sm text-gray-800">
                <h3 className="font-bold text-gray-900 text-sm sm:text-base">1. Purpose and General Terms</h3>
                <div className="space-y-2 pl-4">
                  <p>
                    <strong>1.1.</strong> The Website is intended for informational purposes only. It only provides details about our products, services, and business solutions. We do not facilitate direct purchase of our products, online transactions such as card payments, UPI transfers, or other financial transactions on this Website.
                  </p>
                  <p>
                    <strong>1.2.</strong> We are not responsible if information made available on this site is not accurate, complete or current.
                  </p>
                  <p>
                    <strong>1.3.</strong> You may not use, reproduce, or distribute any of this content without prior written consent from us.
                  </p>
                  <p>
                    <strong>1.4.</strong> We have made every effort to display as accurately as possible the colours and images of our products that appear at the Website, however, we cannot guarantee that your device monitor will display our products accurately.
                  </p>
                  <p>
                    <strong>1.5.</strong> The headings used in this agreement are included for convenience only and will not limit or otherwise affect these terms.
                  </p>
                  <p>
                    <strong>1.6.</strong> You agree to use the Website only for purposes that are permitted by (a) these Terms and (b) any applicable law, regulation, or generally accepted practices or guidelines in the relevant jurisdictions.
                  </p>
                </div>
              </div>

              {/* Section 2 */}
              <div className="space-y-3 font-sans text-xs sm:text-sm text-gray-800 pt-4">
                <h3 className="font-bold text-gray-900 text-sm sm:text-base">2. User Registration and Marketing</h3>
                <div className="space-y-2 pl-4">
                  <p>
                    <strong>2.1.</strong> In order to engage with certain features of the Website, such as submitting a user contact form or requesting trade sample boxes, you may be required to provide your personal information. By submitting your information, you consent to us contacting you through automated emailers, SMS, WhatsApp, or other communication channels.
                  </p>
                  <p>
                    <strong>2.2.</strong> Please note that any data collected by us will only be used to contact you for your business needs and for marketing communications.
                  </p>
                  <p>
                    <strong>2.3.</strong> Your contact information may be used for targeted marketing purposes, such as to contact you through advertising platforms like Facebook and Google. If you prefer not to receive such marketing communications, you can opt out at any time by following the unsubscribe instructions included in the messages or by contacting us directly.
                  </p>
                </div>
              </div>

              {/* Section 3 */}
              <div className="space-y-3 font-sans text-xs sm:text-sm text-gray-800 pt-4">
                <h3 className="font-bold text-gray-900 text-sm sm:text-base">3. Personal Information</h3>
                <div className="space-y-2 pl-4">
                  <p>
                    <strong>3.1.</strong> We will not share or sell your data to third parties except as required by law. All personal information you provide us with or that we obtain will be handled by us in accordance with our Privacy Policy.
                  </p>
                  <p>
                    <strong>3.2.</strong> For more detailed information about how we handle your personal data, please review our Privacy Policy, available on the Website.
                  </p>
                </div>
              </div>

              {/* Section 4 */}
              <div className="space-y-3 font-sans text-xs sm:text-sm text-gray-800 pt-4">
                <h3 className="font-bold text-gray-900 text-sm sm:text-base">4. Intellectual Property</h3>
                <div className="space-y-2 pl-4">
                  <p>
                    <strong>4.1.</strong> All content on this Website, including text, images, logos, graphics, and designs, is the property of Roma Foods or its content suppliers and is protected by applicable Intellectual Property laws.
                  </p>
                  <p>
                    <strong>4.2.</strong> Under no circumstances may browsing this Website, or the references appearing on it, be interpreted as granting a licence to use or any right whatsoever to use these elements.
                  </p>
                  <p>
                    <strong>4.3.</strong> You agree to not submit, upload or integrate any material on the Website that is copyrighted, protected by trade secret, or otherwise subject to third party proprietary rights, including patent, privacy, and publicity rights, unless you are the owner of such rights and such information is permitted by us to be uploaded to the Website.
                  </p>
                </div>
              </div>

              {/* Section 5 */}
              <div className="space-y-3 font-sans text-xs sm:text-sm text-gray-800 pt-4">
                <h3 className="font-bold text-gray-900 text-sm sm:text-base">5. Disclaimer</h3>
                <div className="space-y-2 pl-4 text-justify uppercase text-[11px] sm:text-xs text-gray-700 font-mono tracking-tight leading-relaxed">
                  <p>
                    YOU EXPRESSLY UNDERSTAND AND AGREE THAT YOUR USE OF THE WEBSITE IS AT YOUR SOLE RISK AND THAT THE WEBSITE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT A WARRANTY OF ANY KIND. YOUR USE OF THE WEBSITE AND ANY MATERIAL DOWNLOADED OR OTHERWISE OBTAINED THROUGH THE USE OF THE WEBSITE IS AT YOUR OWN DISCRETION AND RISK AND YOU ARE SOLELY RESPONSIBLE FOR ANY DAMAGE TO YOUR DEVICE OR OTHER EQUIPMENT OR LOSS OF DATA THAT RESULTS FROM SUCH USE.
                  </p>
                  <p>
                    YOU EXPRESSLY UNDERSTAND AND AGREE THAT IN NO EVENT THE COMPANY OR ITS SUBSIDIARIES, HOLDING COMPANIES, AND OTHER AFFILIATES SHALL BE LIABLE TO YOU FOR ANY DIRECT, INDIRECT, SPECIAL, INCIDENTAL, EXEMPLARY, PUNITIVE, OR CONSEQUENTIAL DAMAGES (INCLUDING LOSS OF DATA, ASSETS, BUSINESS, PROFITS OR ABILITY TO EXECUTE) FROM ANY CLAIM BASED UPON CONTRACT, WARRANTY, TORT (INCLUDING NEGLIGENCE), STRICT LIABILITY OR OTHERWISE, AND WHETHER OR NOT THE COMPANY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH LOSS OR DAMAGE. THE FOREGOING LIMITATIONS WILL SURVIVE AND APPLY EVEN IF ANY LIMITED REMEDY SPECIFIED IN THIS TERM IS FOUND TO HAVE FAILED IN ITS ESSENTIAL PURPOSE.
                  </p>
                </div>
              </div>

              {/* Section 6 */}
              <div className="space-y-3 font-sans text-xs sm:text-sm text-gray-800 pt-4">
                <h3 className="font-bold text-gray-900 text-sm sm:text-base">6. Third Party Links</h3>
                <div className="space-y-2 pl-4">
                  <p>
                    The Website may contain links to third-party websites for your convenience. We are not responsible for the content or practices of these third-party websites, and you access them at your own risk.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div>
              <h2 className="text-xl sm:text-2xl font-sans font-bold text-center uppercase tracking-wide text-gray-900 border-b-2 border-gray-900 pb-2 max-w-xs mx-auto mb-8">
                PRIVACY POLICY
              </h2>

              <p className="text-justify font-sans text-xs sm:text-sm text-gray-700 leading-relaxed mb-4">
                At <strong>Roma Foods (ROMAS Chocolates)</strong>, we are committed to respecting and protecting the privacy of our pastry partners, trade distributors, and site visitors. This Privacy Policy outlines how we collect, handle, and safeguard your corporate and personal details.
              </p>

              <div className="space-y-4 font-sans text-xs sm:text-sm text-gray-800">
                <div>
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-1">1. Information We Collect</h3>
                  <p className="text-gray-700 leading-relaxed pl-4">
                    When you contact our trade desk, submit sample box requests, or subscribe to formulation releases, we may collect your business name, chef contact name, email address, WhatsApp telephone number, physical delivery address for samples, and chocolate profile interests.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-1">2. Purpose of Collection & Usage</h3>
                  <p className="text-gray-700 leading-relaxed pl-4">
                    Your details are strictly used to fulfill tasting sample orders, provide technical specification sheets, reply to WhatsApp B2B trade inquiries, and share harvest and pricing announcements from Dhamtari Works.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-1">3. Non-Disclosure & Confidentiality</h3>
                  <p className="text-gray-700 leading-relaxed pl-4">
                    We do not sell, rent, or trade your contact or recipe information with any external brokers. All commercial interactions are treated under strict trade confidentiality.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-1">4. Data Security</h3>
                  <p className="text-gray-700 leading-relaxed pl-4">
                    We implement modern industry-standard electronic, technical, and managerial safeguards to protect your personal information against unauthorized access, loss, or misuse.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-1">5. Contact & Grievance</h3>
                  <p className="text-gray-700 leading-relaxed pl-4">
                    For any privacy-related questions, data updates, or opt-out requests, please write to us at <a href={`mailto:${COMPANY_INFO.email}`} className="text-[#4A1704] font-semibold underline">{COMPANY_INFO.email}</a> or visit Roma Foods, Dhamtari, Chhattisgarh, India.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'cookie' && (
            <div>
              <h2 className="text-xl sm:text-2xl font-sans font-bold text-center uppercase tracking-wide text-gray-900 border-b-2 border-gray-900 pb-2 max-w-xs mx-auto mb-8">
                COOKIE POLICY
              </h2>

              <p className="text-justify font-sans text-xs sm:text-sm text-gray-700 leading-relaxed mb-4">
                This Cookie Policy explains how <strong>ROMAS Chocolates</strong> uses cookies and similar technologies to enhance your browsing experience, remember your preferences, and optimize interactive visual sequences.
              </p>

              <div className="space-y-4 font-sans text-xs sm:text-sm text-gray-800">
                <div>
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-1">1. What Are Cookies?</h3>
                  <p className="text-gray-700 leading-relaxed pl-4">
                    Cookies are small text files placed on your device by websites you visit. They are widely used to make websites work efficiently, remember your viewing preferences, and provide analytical information to site owners.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-1">2. Types of Cookies We Use</h3>
                  <div className="space-y-2 pl-4 text-gray-700">
                    <p>
                      <strong>Essential Cookies:</strong> Necessary for core site navigation, modal state management, and sample tray inquiries.
                    </p>
                    <p>
                      <strong>Performance & Analytics Cookies:</strong> Allow us to monitor video canvas frame buffering, page load metrics, and visitor engagement across product lines.
                    </p>
                    <p>
                      <strong>Functional Cookies:</strong> Remember your selected tasting items and interaction state across page visits.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-1">3. Managing Cookie Preferences</h3>
                  <p className="text-gray-700 leading-relaxed pl-4">
                    Most web browsers allow you to manage cookie preferences through their settings. You can choose to block or delete cookies at any time, though some interactive elements (such as sample bag persistence) may be affected.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Red/Gold Action Footer with Centered 'Close' Button */}
        <div className="py-4 px-6 sm:px-12 bg-gray-50 border-t border-gray-200 flex justify-center shrink-0">
          <button
            onClick={onClose}
            className="px-8 py-2.5 rounded-full bg-[#D32F2F] hover:bg-[#B71C1C] text-white font-medium text-sm transition-all shadow-md active:scale-95 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

