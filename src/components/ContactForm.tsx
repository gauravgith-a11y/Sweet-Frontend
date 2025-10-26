import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import contactImage from "@/assets/contact-sweets.jpg";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  phoneNumber: z.string().trim().min(1, "Phone number is required").max(20, "Phone number must be less than 20 characters"),
  message: z.string().trim().min(1, "Message is required").max(1000, "Message must be less than 1000 characters")
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = (data: ContactFormData) => {
    // Here you would typically send the data to your backend
    toast.success("Thank you! We'll get back to you soon.");
    reset();
  };

  return (
    <section className="py-16 px-4 border-t-2 border-dashed border-primary/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">
              Make your experience even more enjoyable by ordering in advance.
            </h2>
            <p className="text-muted-foreground mb-8">
              Lorem ipsum dolor sit amet consectetur. Sed velit lorem malesuada tristique consectetur. Lorem 
              ipsum dolor sit amet consectetur. Sed velit lorem malesuada tristique consectetur.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Input 
                    placeholder="Name" 
                    {...register("name")}
                    className={errors.name ? "border-destructive" : ""}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
                  )}
                </div>
                <div>
                  <Input 
                    placeholder="Email" 
                    type="email"
                    {...register("email")}
                    className={errors.email ? "border-destructive" : ""}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>
              
              <div>
                <Input 
                  placeholder="Phone Number" 
                  {...register("phoneNumber")}
                  className={errors.phoneNumber ? "border-destructive" : ""}
                />
                {errors.phoneNumber && (
                  <p className="text-sm text-destructive mt-1">{errors.phoneNumber.message}</p>
                )}
              </div>

              <div>
                <Textarea 
                  placeholder="Message" 
                  rows={4}
                  {...register("message")}
                  className={errors.message ? "border-destructive" : ""}
                />
                {errors.message && (
                  <p className="text-sm text-destructive mt-1">{errors.message.message}</p>
                )}
              </div>

              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </div>

          <div className="rounded-lg overflow-hidden">
            <img 
              src={contactImage} 
              alt="Assorted traditional sweets"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
