import { NextPage } from "next";
import { MainLayout } from "@/layouts/layout";
import { HeadingH1 } from "@/components/typography";
import { links } from "@/lib/links";
import { Button } from "@/components/ui/button";

const Label: NextPage = () => {
  return (
    <MainLayout>
      {/* TODO: add head */}
      {/* TODO: refactor Links into Dynamic Zones */}
      <div className="container px-4">
        <HeadingH1 className="my-8">Terms of Service</HeadingH1>
        <section>
          <h2>1. Introduction</h2>
          <p>
            Welcome to Crank Sites! These Terms of Service ("Terms") govern your
            use of Crank Sites's website, products, and services ("Service"). By
            accessing or using our Service, you agree to be bound by these Terms
            and our Privacy Policy.
          </p>
        </section>
        <section>
          <h2>2. Using Our Service</h2>
          <p>
            You must follow any policies made available to you within the
            Service. Don't misuse our Service. For example, don't interfere with
            our Service or try to access it using a method other than the
            interface and the instructions that we provide.
          </p>
        </section>
        <section>
          <h2>3. Your Account</h2>
          <p>
            You may need an account to use some of our services. You are
            responsible for safeguarding your account, so use a strong password
            and limit its use to this account. We cannot and will not be liable
            for any loss or damage arising from your failure to comply with the
            above.
          </p>
        </section>
        <section>
          <h2>4. Privacy</h2>
          <p>
            Your privacy is important to us. Our Privacy Policy explains how we
            collect, use, and share your personal information. By using our
            Service, you agree that Crank Sites can use such data in accordance
            with our privacy policies.
          </p>
        </section>
        <section>
          <h2>5. Modifying and Terminating our Service</h2>
          <p>
            We are constantly changing and improving our Service. We may add or
            remove functionalities or features, and we may suspend or stop a
            Service altogether. You can stop using our Service at any time,
            although we'll be sorry to see you go.
          </p>
        </section>
        <section>
          <h2>6. Disclaimers and Limitations of Liability</h2>
          <p>
            The Service is provided "as is," and we make no express or implied
            warranties or guarantees about the Service. To the extent permitted
            by law, we disclaim all warranties. We shall not be liable for any
            indirect, special, incidental, consequential, or exemplary damages
            arising from your use of the Service or for any other claim related
            in any way to your use of the Service.
          </p>
        </section>
        <section>
          <h2>7. General</h2>
          <p>
            These Terms control the relationship between Crank Sites and you.
            They do not create any third-party beneficiary rights. If you do not
            comply with these Terms, and we don't take action right away, this
            doesn't mean that we are giving up any rights that we may have (such
            as taking action in the future).
          </p>
        </section>
        <section>
          <h2>Contact Us</h2>
          <p>If you have any questions about these Terms, please contact us.</p>
        </section>
      </div>
    </MainLayout>
  );
};

export default Label;
