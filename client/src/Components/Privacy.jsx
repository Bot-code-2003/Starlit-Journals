  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="mb-12">
        <h1 className="text-4xl font-semibold text-[var(--text-primary)] tracking-tight mb-4">
          Privacy Policy
        </h1>
        <p className="text-base text-[var(--text-secondary)]">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <div className="bg-[var(--bg-secondary)] rounded-apple border border-[var(--border)] p-8 shadow-apple mb-8">
          <h2 className="text-2xl font-semibold text-[var(--text-primary)] tracking-tight mb-4">
            1. Information We Collect
          </h2>
          <p className="text-base text-[var(--text-secondary)] leading-relaxed mb-4">
            We collect information that you provide directly to us, including but not limited to:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li className="text-base text-[var(--text-secondary)] leading-relaxed">
              Account information (name, email address, password)
            </li>
            <li className="text-base text-[var(--text-secondary)] leading-relaxed">
              Profile information (bio, preferences, settings)
            </li>
            <li className="text-base text-[var(--text-secondary)] leading-relaxed">
              Journal entries and related content
            </li>
            <li className="text-base text-[var(--text-secondary)] leading-relaxed">
              Communication preferences
            </li>
          </ul>
        </div>

        <div className="bg-[var(--bg-secondary)] rounded-apple border border-[var(--border)] p-8 shadow-apple mb-8">
          <h2 className="text-2xl font-semibold text-[var(--text-primary)] tracking-tight mb-4">
            2. How We Use Your Information
          </h2>
          <p className="text-base text-[var(--text-secondary)] leading-relaxed mb-4">
            We use the information we collect to:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li className="text-base text-[var(--text-secondary)] leading-relaxed">
              Provide, maintain, and improve our services
            </li>
            <li className="text-base text-[var(--text-secondary)] leading-relaxed">
              Process and complete transactions
            </li>
            <li className="text-base text-[var(--text-secondary)] leading-relaxed">
              Send you technical notices and support messages
            </li>
            <li className="text-base text-[var(--text-secondary)] leading-relaxed">
              Communicate with you about products, services, and events
            </li>
          </ul>
        </div>

        <div className="bg-[var(--bg-secondary)] rounded-apple border border-[var(--border)] p-8 shadow-apple mb-8">
          <h2 className="text-2xl font-semibold text-[var(--text-primary)] tracking-tight mb-4">
            3. Information Sharing
          </h2>
          <p className="text-base text-[var(--text-secondary)] leading-relaxed mb-4">
            We do not share your personal information with third parties except in the following circumstances:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li className="text-base text-[var(--text-secondary)] leading-relaxed">
              With your consent
            </li>
            <li className="text-base text-[var(--text-secondary)] leading-relaxed">
              To comply with legal obligations
            </li>
            <li className="text-base text-[var(--text-secondary)] leading-relaxed">
              To protect our rights and prevent fraud
            </li>
            <li className="text-base text-[var(--text-secondary)] leading-relaxed">
              With service providers who assist in our operations
            </li>
          </ul>
        </div>

        <div className="bg-[var(--bg-secondary)] rounded-apple border border-[var(--border)] p-8 shadow-apple">
          <h2 className="text-2xl font-semibold text-[var(--text-primary)] tracking-tight mb-4">
            4. Data Security
          </h2>
          <p className="text-base text-[var(--text-secondary)] leading-relaxed">
            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
          </p>
        </div>
      </div>
    </div>
  ); 