/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Link from "next/link";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { CalendarIcon } from "@heroicons/react/solid";

import { withApollo } from "../../lib/withApollo";
import { useMe } from "../../graphql/generated/page";

import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

import { applicants } from "../../utils/pages/courses";
import { dateFormatter } from "../../utils/formatters/date-formatter";

function Courses() {
  const { data, loading } = useMe();

  return (
    <>
      <Head>
        <title>My courses</title>
      </Head>

      <div className="bg-white">
        <div className="relative overflow-hidden bg-gray-50">
          <Header />
          <main className="py-20 max-w-7xl mx-auto ">
            <div className="text-center mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
              <h2 className="text-base font-semibold tracking-wider text-cyan-600 uppercase">
                Study right now
              </h2>
              <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                My courses
              </p>
            </div>

            {loading ? (
              <div className="flex items-center justify-center my-20">
                <div className="flex items-center justify-center">
                  <div className="w-16 h-16 border-b-2 border-cyan-600 rounded-full animate-spin" />
                </div>
              </div>
            ) : (
              <div className="bg-white shadow overflow-hidden sm:rounded-md mt-8">
                <ul role="list" className="divide-y divide-gray-200">
                  {data?.me.enrollments.map((enrollment) => (
                    <li key={enrollment.id}>
                      <div className="px-4 py-4 flex items-center sm:px-6">
                        <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                          <div className="truncate">
                            <div className="flex text-sm">
                              <p className="font-medium text-indigo-600 truncate">
                                {enrollment.course.title}
                              </p>
                              <p className="ml-1 flex-shrink-0 font-normal text-gray-500">
                                on Programming
                              </p>
                            </div>
                            <div className="mt-2 flex">
                              <div className="flex items-center text-sm text-gray-500">
                                <CalendarIcon
                                  className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                                <p>
                                  Class started at{" "}
                                  <time dateTime={enrollment.createdAt}>
                                    {dateFormatter.format(
                                      new Date(enrollment.createdAt)
                                    )}
                                  </time>
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="mt-4 flex-shrink-0 sm:mt-0 sm:ml-5">
                            <div className="flex overflow-hidden -space-x-1">
                              {applicants.map((applicant) => (
                                <img
                                  key={applicant.email}
                                  className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                                  src={applicant.imageUrl}
                                  alt={applicant.name}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="ml-5 flex-shrink-0">
                          <Link href={`/app/courses/${enrollment.course.slug}`}>
                            <a className="px-2 py-1 border border-transparent text-base font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700">
                              Watch classes
                            </a>
                          </Link>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = withPageAuthRequired({
  returnTo: "/",
});

export default withApollo(Courses);
