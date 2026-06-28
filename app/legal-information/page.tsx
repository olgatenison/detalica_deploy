export default function LegalInformation() {
  return (
    <main className="bg-zinc-50 text-black">
      <section className="px-4 py-24 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <div className="flex lg:flex-row items-start justify-between flex-col">
          <div>
            <p className="text-base font-medium uppercase tracking-[0.22em] text-gray-500">
              Legal Information
            </p>

            <h1 className="mt-5 text-4xl font-semibold text-gray-950 text-balance lg:text-5xl max-w-60">
              Company Information
            </h1>
          </div>
          <div className="mt-16 lg:my-0 grid gap-x-16 gap-y-8 text-sm leading-7 text-gray-600 lg:grid-cols-2">
            <div>
              <h2 className="font-semibold text-black">Company Name</h2>
              <p>DETAILICA OÜ</p>
            </div>

            <div>
              <h2 className="font-semibold text-black">Registration Number</h2>
              <p>16747959</p>
            </div>

            <div>
              <h2 className="font-semibold text-black">VAT Number</h2>
              <p>EE102724860</p>
            </div>

            <div>
              <h2 className="font-semibold text-black">Registered Address</h2>
              <p>Pille 7/1-13, Tallinn, 10138 Harjumaa, Estonia</p>
            </div>

            <div>
              <h2 className="font-semibold text-black">Email</h2>
              <p>Oksana.Kuchura@detailica.com</p>
            </div>

            <div>
              <h2 className="font-semibold text-black">
                Responsible for Website Content
              </h2>
              <p>DETAILICA OÜ</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
